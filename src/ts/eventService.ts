/// <reference path="utils.ts" />

module awk.grid {

    var _ = Utils;

    export class EventService {

        private allListeners: {[key: string]: Function[]} = {};

        private globalListeners: Function[] = [];

        private getListenerList(eventType: string): Function[] {
            var listenerList = this.allListeners[eventType];
            if (!listenerList) {
                listenerList = [];
                this.allListeners[eventType] = listenerList;
            }
            return listenerList;
        }

        public addEventListener(eventType: string, listener: Function): void {
            var listenerList = this.getListenerList(eventType);
            if (listenerList.indexOf(listener)<0) {
                listenerList.push(listener);
            }
        }

        public addGlobalListener(listener: Function): void {
            this.globalListeners.push(listener);
        }

        public removeEventListener(eventType: string, listener: Function): void {
            var listenerList = this.getListenerList(eventType);
            _.removeFromArray(listenerList, listener);
        }

        public removeGlobalListener(listener: Function): void {
            _.removeFromArray(this.globalListeners, listener);
        }

        public dispatchEvent(eventType: string, event: any): void {
            var listenerList = this.getListenerList(eventType);
            listenerList.forEach( (listener)=> {
                listener(event);
            });

            this.globalListeners.forEach( (listener)=> {
                listener(event);
            });
        }
    }

}