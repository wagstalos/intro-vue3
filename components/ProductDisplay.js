app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display container">
      <div class="product-container">
        <div class="product-image">
          <img v-bind:src="image">
        </div>

        <div class="product-info">
          <h1>{{ title }}</h1>
        
          <div class='d-flex space-between'>
            <p v-if="inStock" class="tag c-green">In Stock</p>
            <p v-else class="tag c-red">Out of Stock</p>

            <p>Shipping: {{ shipping }}</p>
          </div>
          

          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>

          <div class="d-flex">
              <div 
              v-for="(variant, index) in variants" 
              :key="variant.id" 
              @click="updateVariant(index)" 
              class="color-circle" 
              :style="{ backgroundColor: variant.color }">
            </div>
          </div>
      
          <button 
            class="button" 
            :class="{ disabledButton: !inStock }" 
            :disabled="!inStock" 
            v-on:click="addToCart">
            Add to Cart
          </button>
        </div>
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <div class='container'>
        <review-form @review-submitted="addReview"></review-form>
      </div>

    </div>`,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", (this.cart += 1));
    },
    // solution
    removeFromCart() {
      if (this.cart >= 1) {
        this.cart -= 1;
      }
    },
    // addToCart() {
    //   this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    // },

    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});
