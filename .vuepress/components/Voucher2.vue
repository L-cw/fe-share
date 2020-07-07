<template>
  <div class="voucher-single-box-2">
    <div class="left-part">
      <div class="icon-box">
        <img
          :src="iconUrl"
          alt=""
        >
      </div>
    </div>
    <div class="middle-part">
      <div class="top-circle" />
      <div class="line" />
      <div class="bottom-circle" />
    </div>
    <div class="right-part">
      <div class="name ellipsis">
        {{ name }}
      </div>
      <div class="desc ellipsis">
        {{ desc }}
      </div>
      <div
        v-if="validityTime.length > 1 && (validityTime[0] - 0) !== 0"
        class="valid-time"
      >
        {{ validityTime[0] }} 至 {{ validityTime[1] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Voucher2',
  props: {
    name: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    iconUrl: {
      type: String,
      default: '/images/voucher-default.png'
    },
    loading: {
      type: Boolean,
      default: false
    },
    validityTime: {
      type: Array,
      default: () => {
        return [0, 0]
      }
    }
  }
}
</script>

<style lang="less" scoped>
  /* 单个卡券的样式 */
  @import url('./less/pc-reset.less');
  @import url('./less/variable.less');
  .voucher-single-box-2 {
    display: flex;
    width: 570px;
    height: 126px;
    border: 1px solid #FF6A00;
    border-radius: 6px;
    background-color: #fef8f2;
    margin-top: 20px;
    & .left-part {
      padding: 23px 12px 23px 26px;
      & .icon-box {
        width: 80px;
        height: 80px;
        & img {
          width: 100%;
          height: 100%;
        }
      }
    }
    & .middle-part {
      position: relative;
      display: flex;
      width: 24px;
      height: 100%;
      justify-content: center;
      & .top-circle {
        position: absolute;
        left: 0;
        right: 0;
        top: -1px;
        width: 24px;
        height: 12px;
        border: 1px solid #FF6A00;
        border-top: none;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        background-color: #fff;
      }
      & .line {
        width: 1px;
        border-right: 1px dashed #FF6A00;
      }
      & .bottom-circle {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
        width: 24px;
        height: 12px;
        border: 1px solid #FF6A00;
        border-bottom: none;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        background-color: #fff;
      }
    }
    & .right-part {
      overflow: hidden;
      padding: 30px 12px 0 12px;
      & .name {
        font-size: @ft-2nd-title;
        color: @theme-color;
        margin-bottom: 18px;
        font-weight: 600;
      }
      & .desc {
        font-size: @ft-main-body;
        color: @ft-color-tips;
        margin-bottom: 10px;
      }
      & .valid-time {
        font-size: @ft-tips;
        color: @ft-color-tips;
      }
    }
  }
</style>