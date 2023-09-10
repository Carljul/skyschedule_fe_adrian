<template>
    <div :class="`m-loader-ring ${additionalClass}`"></div>
</template>
<script>
export default {
  props: {
    additionalClass: {
      type: String,
      default: () => {
        return '';
      }
    }
  }
}
</script>
<style lang="scss">
.m-loader-ring {
  display: inline-block;
  width: 40px;
  height: 40px;
}
.m-loader-ring:after {
  content: " ";
  display: block;
  width: 24px;
  height: 24px;
  margin: 8px;
  border-radius: 50%;
  border: 2px solid #fff;
  border-color: #fff #fff #fff transparent;
  animation: m-loader-ring-anim .5s linear infinite;
}


.m-loader-ring.modal {
  width: 50px;
  height: 35px;
  margin: 0 auto;
}
.m-loader-ring.modal:after {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}

.m-loader-ring.primary:after {
  border: 2px solid var(--pref-color-primary);
  border-color: var(--pref-color-primary) var(--pref-color-primary) var(--pref-color-primary) transparent;
}
@keyframes m-loader-ring-anim {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>