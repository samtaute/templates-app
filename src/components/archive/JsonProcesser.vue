<template>
  <section>
    <!-- Button trigger modal -->
    <div class="button-container">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#jsonImportModal">
        Import JSON
      </button>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#jsonExportModal">
        Export JSON
      </button>
      <button type="button" class="btn btn-danger" @click="submitJson(clearPageJson)">
        Clear
      </button>
    </div>

    <!-- Import Modal -->
    <div class="modal fade" id="jsonImportModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Copy and Paste JSON Below</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitJson(userInput)">
              <div class="mb-3">
                <!-- <label for="userInput" class="form-label">Copy and Paste Page JSON</label> -->
                <textarea class="form-control" id="userInput" rows="12" v-model="userInput"></textarea>
                <button class="btn btn-primary">Submit</button>
              </div>
            </form>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
          </div>
        </div>
      </div>
    </div>
    <!-- Export Modal -->
    <div class="modal fade" id="jsonExportModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Export JSON Below</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="exportJson">
              <div class="mb-3">
                <textarea class="form-control" id="jsonOutput" :value="jsonExport" rows="12"></textarea>
                <button class="btn btn-primary">Export Page</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>


  </section>
</template>
<script>
import baseJson from '../../base'


export default {
  data() {
    return {
      userInput: "",
      clearPageJson: baseJson,
    }
  },
  methods: {
    submitJson(json) {
      try {
        this.$store.dispatch('submitPageJson', json);
      } catch (error) {
        //todo: activate error message 
        console.log(error);
      }
    },
  },

  computed: {
    // userInputJson(){
    //   return JSON.parse(this.userInput); 
    // },
    jsonExport() {
      return this.$store.getters.currentPageJsonToString;
    }
  }
}

</script>
<style scoped>
section {
  width: 25rem;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;

}

#jsonImportModal,
#jsonExportModal {
  top: 80px;
}

.modal {
  z-index: 10000;
}

.btn {
  margin: 4px;
}

.button-container {
  display: flex;
  width: 100%;
}
</style>