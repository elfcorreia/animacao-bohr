function Popup(el) {
    let self = this;
    this.el = el;

    this.layoutLeftTop = function (anchor_el) {        
        self.el.style.top = anchor_el.offsetTop + 'px';
        selef.el.style.left = anchor_el.offsetLeft - self.el.offsetWidth + 'px';
    }

    this.layoutLeftMiddle = function (anchor_el) {        
        self.el.style.top = anchor_el.offsetTop - Math.abs(self.el.offsetHeight - anchor_el.offsetHeight)/2 + 'px';
        self.el.style.left = anchor_el.offsetLeft - self.el.offsetWidth + 'px';
    }

    this.layoutMiddleTop = function (anchor_el) {
        self.el.style.top = anchor_el.offsetTop - self.el.offsetHeight + 'px';        
        let l = anchor_el.offsetLeft - Math.abs(self.el.offsetWidth - anchor_el.offsetWidth)/2;              
        self.el.style.left = l + 'px';                
    }    

	this.show = function (anchor_el) {
        setTimeout(() => {
            self.layoutMiddleTop(anchor_el);
            self.el.style.visibility = 'visible';        
        }, 5);
    }

    this.isShowing = function() {
        return self.el.style.visibility === 'visible';
    }

    this.hide = function () {
        self.el.style.visibility = 'collapse';
    }

    this.toggle = function(anchor_el) {        
        if (self.isShowing()) {
            self.hide();
        } else {            
            self.show(anchor_el);
        }
    }

    this.closeClickOutsideHandler = function (e) {  
        console.log('clicou!', !self.el.contains(e.target));
        if (!self.el.contains(e.target)) {
            self.hide();
        }
    }    

    this.hide();
    self.el.style.position = 'absolute';    
    self.el.style["z-index"] = 100;
    document.addEventListener("click", self.closeClickOutsideHandler);
}

function initPopups() {
	return Array.from(document.querySelectorAll('div[data-popup]')).forEach(el => {
        let p = new Popup(document.getElementById(el.dataset.popup));
        el.addEventListener("click", (e) => {
            console.log("oi");
            p.toggle(el);          
        });
    });
}