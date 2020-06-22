<template>
  <transition name="fade">
    <div
      v-show="visible"
      class="settings-container">
      <div class="settings">
        <div class="settings-title">Settings</div>
        <div class="settings-row">
          <label>Number of Players</label>
          <div>
            <div
              v-for="num in [3, 4, 5]"
              :class="{
                active: numPlayers === num,
                'num-players-option': true,
              }"
              @click="updateNumPlayers(num)">
              {{ num }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SettingsMenu',
  model: {
    prop: 'visible',
    event: 'updateVisibility',
  },
  props: {
    numPlayers: {
      type: Number,
      required: true,
    },
    updateNumPlayers: {
      type: Function,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.settings-container {
  background-color: #ddd;
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  height: 200px;
  margin: 0 10px;
  overflow: hidden;
  width: 300px;
}

.settings {
  padding: 15px 30px;
  text-align: left;
}

.settings-title {
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: center;
}

label {
  font-size: 0.9em;
  font-weight: 600;
}

.num-players-option {
  background-image: linear-gradient(270deg, #fff, #eee);
  border: 1px solid #999;
  border-right: none;
  cursor: pointer;
  display: inline-block;
  margin: 5px 0;
  padding: 4px 12px;
  &:last-child {
    border-right: 1px solid #999;
  }
  &.active {
    background-color: steelblue;
    background-image: none;
    color: white;
  }
  &:not(.active):hover {
    background-image: linear-gradient(270deg, #ddd, #ccc);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter, .fade-leave-to {
  height: 0;
}
</style>
