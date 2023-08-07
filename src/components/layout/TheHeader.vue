<template>
  <header class="header-container">
    <div class="header-icon">
      <button class="btn btn-primary" @click="reset">Reset</button>
      <div>{{ this.$store.getters.activeBranch }}</div>
    </div>
    <div class="btn-group page-buttons" role="group" aria-label="Basic example">
      <button
        v-for="page in activePages"
        type="button"
        @click.exact="activatePage(page)"
        @click.shift="deletePage(page)"
        @click.alt="deletePage(page)"
        :key="page"
        class="btn btn-secondary page-button"
        data-toggle="button"
      >
        {{ truncateFilename(page) }}
      </button>
    </div>
    <div class="header-buttons">
      <button type="button" @click="back" class="btn btn-secondary">
        Undo
      </button>
      <button type="button" @click="forward" class="btn btn-secondary">
        Redo
      </button>
      <!-- <button type="button" @click="addLegalBlock" class="btn btn-secondary">
        Run Script
      </button> -->
    </div>
  </header>
</template>
<script>
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      selectedFile: null,
      branchInput: "",
    };
  },

  computed: {
    fileName() {
      return this.$store.getters.fileName;
    },
    pageTitle() {
      return this.$store.getters.pageTitle;
    },
    activePages() {
      let activePages = [];
      for (let [key, value] of Object.entries(
        this.$store.state.pageDirectory
      )) {
        if (value.status === "active" || value.status === "displayed") {
          activePages.push(key);
        }
      }
      return activePages;
    },
  },
  methods: {
    addLegalBlock() {
      for (let [key, value] of Object.entries(
        this.$store.state.pageDirectory
      )) {
        if (value.blocks && value.blocks.length > 2) {
          if (
            value.blocks[value.blocks.length - 2].blockType ===
            "portal_footer_block"
          ) {
            value.blocks.pop();
            value.blocks.pop();
            value.blocks.push({
              blockType: "portal_footer_block",
            });
            console.log(key);
            this.$store.state.revisedPages.push(key);
          }
        }
      }

      // {
      //   this.$store.state.revisedPages.push(key);
      //   console.log(key);
      //   if (value.blocks) {
      //     value.blocks.push({
      //       blockType: "portal_footer_block",
      //     });
      //   }
      // }
    },
    runScript() {
      function setCategory(feedArray) {
        for (let feed of feedArray) {
          if (feed.feed_id.includes("arkadium")) {
            return "arkadium";
          } else if (feed.feed_id.includes("playbuzz")) {
            return "quiz";
          } else if (feed.feed_id.includes("fotoscapes_all")) {
            return "standard";
          } else if (feed.feed_id.includes("news")) {
            return "news";
          } else if (feed.feed_id.includes("celeb")) {
            return "entertainment";
          } else if (feed.feed_id.includes("entertainment")) {
            return "entertainment";
          } else if (feed.feed_id.includes("sports")) {
            return "sports";
          } else if (feed.feed_id.includes("deportes")) {
            return "sports";
          } else if (feed.feed_id.includes("lifestyle")) {
            return "lifestyle";
          } else if (feed.feed_id.includes("recipes")) {
            return "lifestyle";
          } else if (feed.feed_id.includes("tech")) {
            return "technology";
          } else if (feed.feed_id.includes("gear")) {
            return "technology";
          } else {
            return "standard";
          }
        }
      }
      for (let [key, value] of Object.entries(
        this.$store.state.pageDirectory
      )) {
        if (key === "workset") continue;
        if (!value.blocks) continue;
        for (let [index, block] of value.blocks.entries()) {
          if (block.blockType === "rss_feed_block") {
            let layout = block.settings.layout;
            let count = block.settings.count;
            let newBlock = {
              blockType: "fotoscape_block",
              settings: {
                uid: uuidv4(),
                layout: layout,
                count: count,
                category: setCategory(block.settings.feeds),
              },
            };
            if (block.settings.title) {
              newBlock.settings.title = {
                text: block.settings.title.text,
              };
            }
            if (block.platforms) {
              newBlock.platforms = block.platforms;
            }
            if (block.excludePlatforms) {
              newBlock.excludePlatforms = block.excludePlatforms;
            }
            let fullPath = [key, "blocks", index];
            let payload = {
              path: fullPath,
              value: newBlock,
            };

            this.$store.dispatch("editDirectory", payload);
          }
        }
      }
    },
    reset() {
      console.log("reset");
      localStorage.clear();
      location.reload();
    },
    back() {
      this.$store.dispatch("back");
    },
    forward() {
      this.$store.dispatch("forward");
    },
    activatePage(pageName) {
      let status = this.$store.state.pageDirectory[pageName]["status"];
      if (status === "active") {
        this.$store.state.pageDirectory[pageName]["status"] = "displayed";
      } else {
        this.$store.state.pageDirectory[pageName]["status"] = "active";
      }
    },
    deletePage(page) {
      this.$store.state.pageDirectory[page]["status"] = "stored";
    },
    truncateFilename(pageTitle) {
      let shortened = pageTitle.replace("en__", "").replace(".json", "");
      return shortened;
    },
  },
};
</script>
<style scoped>
#fileInput {
  margin-left: 3px;
}

.header-container {
  background: #f1f3f4;
  display: flex;
  position: fixed;
  height: 4.5rem;
  top: 0;
  width: 100%;
  z-index: 9999;
  border-bottom: 1px solid #dadce0;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgb(218, 220, 224);
}

.header-icon {
  align-self: center;
  margin-left: 1rem;
  display: flex;
  align-items: flex-start;
  padding: 2px;
  column-gap: 0.25rem;
  height: 100%;
  width: 15rem;
  flex-direction: column;
}

.header-buttons {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: end;
  margin-right: 2rem;
}

.page-buttons {
  margin-left: 2rem;
  display: flex;
  max-width: 100rem;

  flex-grow: 3;
}

.header-title {
  width: 100%;
  height: 2.4rem;
  display: flex;
}

.page-button {
  min-width: 8rem;
  margin: 0.2rem;
  font-size: 0.8rem;
}

/* button {
    margin: 0 .2remx;
} */
</style>
