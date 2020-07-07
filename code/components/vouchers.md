## 卡券相关组件

## 卡券一

<voucher-1
  name="小米MIX3开启全面屏新时代"
  desc="小米MIX3 支持5G 好看又能打 滑盖即可解锁"
  :validityTime="['2019-07-16', '2019-08-14']"
/>

| 字段            | 类型   | 解释       | 默认值                      |
| --------------- | ------ | ---------- | --------------------------- |
| accepterIconUrl | String | 承兑方icon | /images/default-avatar.png  |
| voucherIconUrl  | String | 券的icon   | /images/voucher-default.png |
| name            | String | 名字       | 20字符内                    |
| desc            | String | 描述       | 25字符内                    |
| validityTime    | String | 有效期     | [0, 0]                      |



## 卡券二

<voucher-2
  name="小米MIX3开启全面屏新时代"
  desc="小米MIX3 支持5G 好看又能打 滑盖即可解锁"
  :validityTime="['2019-07-16', '2019-08-14']"
/>

| 字段           | 类型   | 解释     | 默认值                      |
| -------------- | ------ | -------- | --------------------------- |
| voucherIconUrl | String | 券的icon | /images/voucher-default.png |
| name           | String | 名字     | 20字符内                    |
| desc           | String | 描述     | 25字符内                    |
| validityTime   | String | 有效期   | [0, 0]                      |