<template>
  <div class="current_order_panel">
    <div class="current_order_panel_header">
      <div class="current_order_panel_header_type">
        Новый
      </div>

      <div class="acceptButton">
        Принять заказ
      </div>
    </div>

    <div class="current_order_info">
      <div class="current_order_info_list" :key="dish.id" v-for="dish in order.dishes">
        <div class="current_order_info_list_dish">
          <span>{{dish.quantity}} x {{dish.name}}</span> <span>{{dish.price}} руб.</span>
        </div>
      </div>
      <div class="current_order_info_total">
        <div class="current_order_info_total_calc">
          <p>Промежуточная сумма <span>{{order.order_cost}}  руб.</span></p>
          <p>Стоимость доставки <span>0.00 руб.</span></p>  
        </div>
        <div class="current_order_info_total_price">
          <p>Итого <span>{{order.order_cost}} руб.</span></p>  
        </div>
      </div>
    </div>

    <Popup v-bind="order"/>.
  
  </div>
</template>

<script>
import Popup from "@/components/Popup.vue"
export default {
  name: "CurrentOrder",
  components: {
    Popup
  },
  data () {
    return {
      order: {
          id: 1,
          order_status: 0,
          order_cost: 12.5,
          special_preferences: "",
          cutlery: 1,
          registration_time: "2018-12-30T22:20:32.170Z",
          restaurant_arrival_time: "2018-12-30T22:49:15.110Z",
          dishes: [
              {
                  price: 9.5,
                  quantity: 1,
                  name: "Нагетсы",
                  size: "9 штук",
                  options: [
                      {
                          "name": "Дополнительный нагетс",
                          "price": "2",
                          "count": "1"
                      }
                  ]
              },
              {
                  price: 1,
                  quantity: 1,
                  name: "Картошка фри",
                  size: "Большая",
                  options: []
              }
          ]
      }
    }
  },
  mounted () {

  },
  props: {
    showPopup: true,
  },
  methods: {

  }
};
</script>

<style scoped lang="less">
  .current_order {
    &_panel {

      &_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;

        &_type {
          padding: 3px 10px;
          background: #0070ff;
          border-radius: 15px;
          color: #fff;
        }
      }
    }
    &_info {
      // padding: 20px;
      text-align: left;
      &_list {
        padding: 4px 10px;

        &_dish {
          display: flex;
          justify-content: space-between;
        }
      }
      &_total {
        padding-top: 25px;

        p {
          margin: 5px 0;
          display: flex;
          justify-content: space-between;
        }
        &_calc {
          font-size: 14px;
        }
        &_price {
          padding: 10px;
          background: #fff;
          border-radius:3px;
          font-weight: 600;
        }
      }
    }
  }
  .acceptButton {
    padding: 10px;
    width: 120px;
    height: 30px;
    background: orange;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 3px;
  }
  
</style>
