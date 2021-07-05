const datesContainer = document.getElementsByClassName('dates-container')[0]; 

function parallax() {
    const screenPos = Math.max(0, Math.min(1.1, (window.innerHeight - datesContainer.getBoundingClientRect().top) / window.innerHeight));
    const coords = '50% '+ (screenPos * 50) + '%';
	datesContainer.style.backgroundPosition = coords;
}

class Menu {
    constructor() {
        this.headerContainer = document.getElementsByClassName('header')[0];
        this.prevScroll = 0;
        this.clickTimeStamp = 0;
    }
    get top() {
        let top = this.headerContainer.style.top;
        top = parseInt(top.substr(0, top.length - 2)) || 0;
        return top;
    }
    set top(v) {
        this.headerContainer.style.top = v + "px";
    }
    onScroll(e) {
        const height = this.headerContainer.getBoundingClientRect().height;
        const heightOffset = -1 * height;

        if (window.scrollY < height && this.prevScroll > window.scrollY) {
            // hanlde case where menu is at top of page
            const newTop = (0 - window.scrollY);
            if (newTop > this.top) {
                this.top = newTop;
            }
        } else if (e.timeStamp < this.clickTimeStamp + 1000) {
            // handle automatic anchor scrolling
            this.top = heightOffset;
        } else {
            let top = this.top;
            // change menu offset based on scroll direction
            if (this.prevScroll > window.scrollY) {
                top += 10;
            } else {
                top -= window.scrollY - this.prevScroll;
            }
            if (top > 0) {
                top = 0;
            } else if (top < heightOffset) {
                top = heightOffset;
            }
            this.top = top;
        }
        this.prevScroll = window.scrollY;
    }
    onAnchorClick(e) {
        this.clickTimeStamp = e.timeStamp;
    }
    hideOnLoad() {
        if (window.scrollY > 10) {
            const height = this.headerContainer.getBoundingClientRect().height;
            const heightOffset = -1 * height;    
            menu.top = heightOffset;
        }
    }
}

const menu = new Menu();
menu.hideOnLoad();

window.addEventListener("scroll", (e) => {
    menu.onScroll(e);
	parallax();	
});

document.querySelectorAll('.header nav a')
    .forEach(e => e.addEventListener('click', (e) => menu.onAnchorClick(e)))

