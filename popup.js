function Popup(el) {
    let self = this;
    
    this.layoutLeftTop = function (anchor_el) {        
        el.style.top = anchor_el.offsetTop + 'px';
        el.style.left = anchor_el.offsetLeft - el.offsetWidth + 'px';
    }

    this.layoutLeftMiddle = function (anchor_el) {        
        el.style.top = anchor_el.offsetTop - Math.abs(el.offsetHeight - anchor_el.offsetHeight)/2 + 'px';
        el.style.left = anchor_el.offsetLeft - el.offsetWidth + 'px';
    }

	this.show = function (anchor_el) {
        self.layoutLeftMiddle(anchor_el);
        el.style.visibility = 'visible';
        setTimeout(() => {
            document.addEventListener("click", this.closeClickOutsideHandler);
        }, 10);
    }

    this.isShowing = function() {
        return el.style.visibility === 'visible';
    }

    this.hide = function () {
        el.style.visibility = 'collapse';
    }

    this.toggle = function(anchor_el) {
        if (self.isShowing()) {
            self.hide();
        } else {            
            self.show(anchor_el);
        }
    }

    this.closeClickOutsideHandler = function (e) {           
        if (!el.contains(e.target)) {
            self.hide();
            document.removeEventListener("click", self.closeClickOutsideHandler);
        }
    }    

    this.hide();
    el.style.position = 'absolute';    
    el.style["z-index"] = 100;   
}

function initPopups() {
	return Array.from(document.querySelectorAll('div[data-popup]')).forEach(el => {
        let p = new Popup(document.getElementById(el.dataset.popup));
        el.addEventListener("click", (e) => {
            p.show(el);            
        });
    });
}