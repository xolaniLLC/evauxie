import { Component, OnInit } from '@angular/core';
import {loadStripe, Stripe, StripeElements} from "@stripe/stripe-js";

@Component({
  selector: 'app-payment-stripe',
  templateUrl: './payment-stripe.component.html',
  styleUrls: ['./payment-stripe.component.scss']
})
export class PaymentStripeComponent implements OnInit {

  stripe: Stripe | any;
  elements: StripeElements | any;
  idModal = Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111;
  clientSecret = "null";
  isLoading = false;

  constructor() { }

  async ngOnInit() {

    // Chargez la bibliothèque Stripe
    this.stripe = await loadStripe('pk_test_51NmmktAHNolMHKyARrfGO1BNBunndZl5Q9WaJgfRPoEGjPIa02WbGybPcCgEH3zyUVSP3mTW01MCZtDwBu9Y8NAO002oD9S1G4');
    // Créez une instance des éléments Stripe
    this.elements = this.stripe.elements();

    // Créez un élément de carte Stripe
    const cardElement = this.elements.create('card');
    // Montrez l'élément de carte dans votre formulaire
    cardElement.mount('#card-element-' + this.idModal);

    // Gérez le formulaire de paiement lorsqu'il est soumis
    const result = await this.stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (result.error) {
      // Gérez les erreurs de paiement
      console.error(result.error.message);
    } else {
      // Envoyez le résultat à votre backend pour traiter le paiement
      const paymentMethod = result.paymentMethod;
      console.log(paymentMethod);
      // Effectuez une requête HTTP vers votre backend pour traiter le paiement
    }

    const pointe = this;
    document.getElementById('payment-form-' + this.idModal)!.addEventListener('submit', function(ev) { console.log("waaaaaaaaaaaaaaaa");
      pointe.isLoading = true;
      ev.preventDefault();
      // If the client secret was rendered server-side as a data-secret attribute
      // on the <form> element, you can retrieve it here by calling `form.dataset.secret`
      pointe.stripe.confirmCardPayment(pointe.clientSecret, {
        payment_method: {
          card: 'card'
        }
      }).then(function(result: any) {
        if (result.error) {
          // Show error to your customer (for example, insufficient funds)
          console.log(result.error.message);
          pointe.isLoading = false;
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            pointe.isLoading = false;
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
          }
        }
      });
    });
  }

  modalHandler(val: any) {
    let modal: any = document.getElementById("modalBay_" + this.idModal);
    if (val) {
      modal.classList.remove("hidden");
    } else {
      modal.classList.add("hidden");
    }
  }
}
