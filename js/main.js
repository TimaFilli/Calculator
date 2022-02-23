let nums = document.querySelectorAll('.num')
let signs = document.querySelectorAll('.sign')
let display = document.querySelector('input')
let equal = document.querySelector('.equal')
let clearButton = document.querySelectorAll('.remove-element')[0]
let removeButton = document.querySelectorAll('.remove-element')[1]
let dot = document.querySelector('.dot')
let signsChars = ['+', '✕', '-', '÷']


class Calculator {
    nums() {
        for (let num of nums) {
            num.addEventListener("click", (event) => {
                event.preventDefault()
                if (this.checkZero(display.value)) return
                display.value = display.value + num.textContent
            })
        }
    }

    clear() {
        clearButton.onclick = (event) => {
            display.value = null
        }
    }

    removeButton() {
        removeButton.onclick = (event) => {
            display.value = display.value.split('').splice(0, display.value.length - 1).join('')
        }
    }

    equal() {
        equal.onclick = (event) => {
            event.preventDefault()
            if (display.value.split('').some(el => el == "+")) {
                let result = display.value.split("+")
                display.value = (+result[0]) + (+result[1])
                return
            } else if (display.value.split('').some(el => el == "-")) {
                let result = display.value.split("-")
                display.value = (+result[0]) - (+result[1])
                return
            } else if (display.value.split('').some(el => el == "✕")) {
                let result = display.value.split("✕")
                display.value = (+result[0] * +result[1])
                return
            } else if (display.value.split('').some(el => el == "÷")) {
                let result = display.value.split("÷")
                display.value = (+result[0] / +result[1])
                return
            } else return
        }
    }

    signs() {
        for (let sing of signs) {
            sing.addEventListener("click", (event) => {
                event.preventDefault()
                if (this.checkValid(display.value)) {
                    display.value = display.value + sing.textContent
                }
                return
            })
        }
    }

    dot() {
        dot.addEventListener("click", (event) => {
            event.preventDefault()
            if (!display.value) return
            let check = this.checkDot(display.value)
            if (check == 1) return
            else display.value += dot.textContent
        })
    }

    checkValid(value) {
        value = value.split('')
        if (value[value.length - 1] == ".") return false
        for (let num of value) {
            if (signsChars.some(el => el == num)) return false
        }
        return true
    }

    checkDot(value) {
        value = value.split('')
        let count = 0
        if (value[value.length - 1] == "+" || value[value.length - 1] == "-") return 1
        if (value[value.length - 1] == "✕" || value[value.length - 1] == "÷") return 1
        for (let num of value) {
            if (num == ".") count += 1
            if (count == 2) return count
            if (signsChars.some(el => el == num)) count = 0
        }
        return count
    }

    checkZero(value) {
        value = value.split('')
        if (value.length == 1 && value[0] == '0') return true
        return false
    }

    start() {
        this.removeButton()
        this.clear()
        this.equal()
        this.signs()
        this.nums()
        this.dot()
    }
}

display.value = null
let calculator = new Calculator()
calculator.start()