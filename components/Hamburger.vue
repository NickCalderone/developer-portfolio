<script>
export default {
  props: ['menuHandler']
}
</script>
<template>
  <button class="mobile-menu-button" aria-label="menu" aria-labelledby="mobile-menu-button-title mobile-menu-button-description" @click="menuHandler">
    <svg width="60" height="60" viewBox="0 0 100 100">
      <title id="mobile-menu-button-title">Mobile menu button</title>
      <desc id="mobile-menu-button-description">A button to open and close the mobile menu</desc>
      <path class="line line1" stroke-linecap="round"
        d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
      <path class="line line2" stroke-linecap="round" d="M 20,50 H 80" />
      <path class="line line3" stroke-linecap="round"
        d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
    </svg>
  </button>
</template>

<style>
.mobile-menu-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: none;
  padding: 0;
  width: 75px;
}

.line {
  fill: none;
  stroke: var(--color-quaternary);
  stroke-width: 5;
  transition: stroke-dasharray 300ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line1 {
  stroke-dasharray: 60 207;
  stroke-width: 5;
}

.line2 {
  stroke-dasharray: 60 60;
  stroke-width: 5;
}

.line3 {
  stroke-dasharray: 60 207;
  stroke-width: 5;
}

.opened .line1 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 5;
}

.opened .line2 {
  stroke-dasharray: 1 60;
  stroke-dashoffset: -30;
  stroke-width: 5;
}

.opened .line3 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 5;
}

@media only screen and (max-width: 700px) {
  .mobile-menu-button {
    display: block;
  }
}
</style>