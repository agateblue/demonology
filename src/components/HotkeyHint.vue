<template>
  <span class="hotkey-hint" v-if="$store.state.settings.showHotkeys"><slot></slot></span>
</template>