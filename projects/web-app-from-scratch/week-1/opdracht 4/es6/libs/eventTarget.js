class EventTarget {
    
    constructor() {

        this._listeners = {}    

    }

    addListener(a , c) {

        "undefined" == typeof this._listeners[a] && (this._listeners[a] = []);
        this._listeners[a].push(c);

    }

    fire(a) {

        "string" == typeof a && (a = {
            
            type: a

        });

        a.target || (a.target = this);

        if (!a.type) throw Error("Event object missing 'type' property.");

        if (this._listeners[a.type] instanceof Array) {
            
            for (var c = this._listeners[a.type], b = 0, d = c.length; b < d; b++) {

                c[b].call(this, a);  

            } 

        }   

    }

    removeListener() {

        if (this._listeners[a] instanceof Array) {

            for (var b = this._listeners[a], d = 0, e = b.length; d < e; d++) {

                if (b[d] === c) {
                
                    b.splice(d, 1);
                    break;

                }

            }
            
        }

    }

}

export default EventTarget;
