<template>
  <div class="voucher-single-box-1 voucher-wrapper">
    <div class="box-top">
      <div class="logo-box">
        <div class="logo">
          <img
            :src="accepterIconUrl"
            alt=""
          >
        </div>
        <div class="logo-text">
          贵州茅台
        </div>
      </div>
      <div class="intro-box">
        <div class="intro-left">
          <div class="icon-box">
            <img
              :src="voucherIconUrl"
              alt=""
            >
          </div>
        </div>
        <div class="intro-right">
          <div class="name ellipsis">
            {{ name }}
          </div>
          <div class="desc ellipsis">
            描述：{{ desc }}
          </div>
        </div>
      </div>
    </div>
    <div class="divide-line" />
    <div
      v-if="validityTime.length > 1 && (validityTime[0] - 0) !== 0"
      class="valid-time"
    >
      有效期：{{ validityTime[0] }} 至 {{ validityTime[1] }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Voucher1',
  props: {
    accepterIconUrl: {
      type: String,
      default: '/images/default-avatar.png'
    },
    voucherIconUrl: {
      type: String,
      default: '/images/voucher-default.png'
    },
    name: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    validityTime: {
      type: Array,
      default: () => {
        return [0, 0]
      }
    }
  },
  data () {
    return {
      voucherBaseInfo: {
        name: '小米MIX3开启全面屏新时代',
        desc: '小米MIX3 支持5G 好看又能打 滑盖即可解锁'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('./less/pc-reset.less');
  @import url('./less/variable.less');
  .voucher-single-box-1 {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 542px;
    height: 210px;
    padding: 18px 16px 14px 25px;
    margin-top: 20px;
    background: url('/images/vouchers-bg.png') no-repeat;
    box-sizing: border-box;
    & .box-top {
      & .logo-box {
        display: flex;
        margin-bottom: 16px;
        & .logo {
          width: 26px;
          height: 26px;
          margin-right: 10px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #eee;
          & img {
            width: 100%;
            height: 100%;
          }
        }
        & .logo-text {
          font-size: @ft-main-body;
          line-height: 26px;
          color: @ft-color-tips;
        }
      }
      & .intro-box {
        display: flex;
        & .intro-left {
          margin-right: 16px;
          & .icon-box {
            width: 76px;
            height: 76px;
            overflow: hidden;
            background-color: #fff;
            & img {
              width: 100%;
              height: 100%;
            }
          }
        }
        & .intro-right {
          flex: 1;
          display: flex;
          overflow: hidden;
          flex-direction: column;
          & .name {
            font-size: @ft-3rd-title;
            margin-bottom: 8px;
            color: @ft-color-title;
            font-weight: 600;
            line-height: 1.5;
          }
          & .desc {
            font-size: @ft-main-body;
            margin-bottom: 8px;
            color: @ft-color-main-body;
            line-height: 1.5;
          }
          & .face-value {
            font-size: @ft-main-body;
            color: @ft-color-tips;
            line-height: 1.5;
          }
        }
      }
    }
    & .divide-line {
      width: 466px;
      height: 0px;
      border-bottom: 1px dashed #D0D4FD;
      position: absolute;
      left: 24px;
      bottom: 48px;
    }
    & .valid-time {
      height: 33px;
      font-size: @ft-main-body;
      color: @ft-color-tips;
      line-height: 33px;
    }
  }
</style>