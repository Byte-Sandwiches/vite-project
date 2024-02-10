//@ts-nocheck

import { Centrifuge } from 'centrifuge';
import { env } from "$env/dynamic/public"

class Realtime {
   #socUrl = env.PUBLIC_SOC_URL
   #token = env.PUBLIC_TOKEN
   isConnected = false;

   constructor() {
       this.centri = new Centrifuge(this.#socUrl, {
           token: this.#token
       });
   }

   connect() {
       if (this.isConnected) {
           return;
       }
       try {
           this.centri.on('connecting', function (ctx) {
               console.log(`connecting: ${ctx.code}, ${ctx.reason}`);
           }).on('connected', function (ctx) {
               console.log(`connected over ${ctx.transport}`);
               this.isConnected = true;
           }).on('disconnected', function (ctx) {
               console.log(`disconnected: ${ctx.code}, ${ctx.reason}`);
           }).connect();
       } catch (error) {
           console.log("CONNE", error);
       }
   }

   subscribe(channel, callback) {
        try {
            this.sub = this.centri.newSubscription(channel);

            this.sub.on('publication', function (ctx) {
                callback(null, ctx);
            }).on('subscribing', function (ctx) {
                console.log(`subscribing: ${ctx.code}, ${ctx.reason}`);
            }).on('subscribed', function (_) {
                console.log('subscribed');
            }).on('unsubscribed', function (ctx) {
                console.log(`unsubscribed: ${ctx.code}, ${ctx.reason}`);
            }).subscribe();
        } catch (error) {
            callback(error);
        }
    }

   unsubscribe() {
       this.sub?.unsubscribe();
   }

   disconnect() {
       this.unsubscribe();
       this.centri.on('disconnected', (ctx) => {
           console.log(`disconnected: ${ctx.code}, ${ctx.reason}`);
           this.isConnected = false;
       }).disconnect();
   }
}

export const realT = new Realtime()
