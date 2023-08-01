<template>
  <section class="section">
    <div class="container">
      <table class="table is-size-5">
        <thead>
          <tr>
            <th>Lookup</th>
            <th>Checked @</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lookup in lookups" :key="lookup.id">
            <td>{{ lookup.display_name || lookup.name }}</td>
            <td>{{ formatDate(lookup.time) }}</td>
            <td>
              <span :class="{ tag: true, 'is-danger': !lookup.status, 'is-success': lookup.status, 'has-text-weight-bold': true, 'is-size-6': true }">
                {{ lookup.status ? 'Online' : 'Offline' }}
              </span>
            </td>
            <td>
              <button class="button is-info is-light" @click="showHistory(lookup.name, lookup.display_name)">
                History
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div :class="{ modal: true, 'is-active': currentServiceName.length }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box" v-if="currentServiceLoading">
          Loading...
        </div>
        <div class="box" v-if="!currentServiceLoading ">
          <h1 class="title is-4">{{ currentServiceName }}</h1>
          <table class="table is-size-5">
            <thead>
              <tr>
                <th>Checked @</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="history in currentServiceHistory" :key="history.id">
                <td>{{ formatDate(history.time) }}</td>
                <td>
                  <span :class="{ tag: true, 'is-danger': !history.status, 'is-success': history.status, 'has-text-weight-bold': true, 'is-size-6': true }">
                    {{ history.status ? 'Online' : 'Offline' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="hideHistory()"></button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'LookupsList',
  props: {
    msg: String
  },
  data: () => ({
    lookups: [],
    currentService: null as any,
    currentServiceName: '',
    currentServiceLoading: false
  }),
  mounted () {
    this.$http.get('/services/').then((response: { data: any }) => {
      this.lookups = response.data
    })
  },
  methods: {
    showHistory (name: string, displayName?: string) {
      this.currentServiceLoading = true
      this.currentServiceName = displayName || name

      this.$http.get(`/services/${name}`).then((response: { data: any }) => {
        this.currentServiceLoading = false
        this.currentService = response.data
      })
    },
    hideHistory () {
      this.currentServiceName = ''
    }
  },
  computed: {
    currentServiceHistory () {
      return this.currentService?.lookups || []
    },
    formatDate () {
      return (date: string) => dayjs(date).format('MM/DD/YYYY hh:mm a')
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "bulma/sass/helpers/color.sass";

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.table {
  width: 100%;
  border-collapse: collapse;

  td, th {
    padding: 10px;
  }

  thead tr th {
    background: $info;
    border-bottom: 2px solid black;
    color: white;
    text-align: center;
  }

  tbody tr td {
    background: $light;
  }
}
</style>
