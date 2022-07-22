// Tên: Chữ hoa chữ thường, không có kí tự đặc biệt, có thể tiếng Việt (Xong)
// Email: Theo chuẩn mail (Xong)
// Mật khẩu: 8 - 32 ký tự, ít nhất 1 chữ hoa và 1 chữ thường (Xong)
// Xác nhận mật khẩu (Xong)

// Hiển thị thông báo lỗi, ẩn nếu đúng (Xong)
// Disable submit button nếu có lỗi
// Đăng ký thành công hiện một popup thông báo đã đăng kí thành công 

var form = document.querySelector('form')
console.log(form)
var username = document.querySelector("#username")
var email = document.querySelector('#email')
var password = document.querySelector('#password')
var confirmPassword = document.querySelector('#confirm-password')
var submitBtn = document.querySelector('.btn-submit')
var popup = document.querySelector('.form-popup')
var overlay = document.querySelector('.overlay')

function disableBtn() {
    submitBtn.disabled = true
    submitBtn.classList.add('disabled')
}

function enableBtn() {
    submitBtn.disabled = false
    submitBtn.classList.remove('disabled')
}

function showError(input, message) {
    input.value = input.value.trim()
    let parent = input.parentElement
    let small = parent.querySelector('small')

    parent.classList.add('error')
    small.innerText = message
    disableBtn()
}

function showSuccess(input) {
    input.value = input.value.trim()
    let parent = input.parentElement
    let small = parent.querySelector('small')

    parent.classList.remove('error')
    small.innerText = ''
    enableBtn()
}

function showPopup() {
    popup.style.cssText = "transform: translateX(0); opacity: 1; z-index: 9999"
    overlay.style.opacity = 0.3
}

function checkInputValue(listInput) {
    let isEmptyError = true
    listInput.forEach(input=> {
        input.value = input.value.trim()
        if (!input.value) {
            showError(input, `${input.placeholder} is required`)
        }
        input.addEventListener('change', () => {
            if (input.value) {
                showSuccess(input)
                isEmptyError = false
            }
            else {
                showError(input, `${input.placeholder} is required`)
            }
            return isEmptyError
        })
    })
}

function checkEmail(input) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let isEmailError = true 

    input.value = input.value.trim()
    if (emailRegex.test(input.value)) {
        showSuccess(input)
        isEmailError = false
    } else {
        showError(input, 'Invalid Email')
    }
    return isEmailError
}

function checkUserName(input) {
    const usernameRegex = /[^\W]/g
    let isUsernameError = true 

    input.value = input.value.trim()
    if (usernameRegex.test(input.value)) {
        showSuccess(input)
        isUsernameError = false
    } else {
        showError(input, 'Invalid Username')
    }
    return isUsernameError
}

function checkPassword(input, min, max) {
    let isPasswordError = true
    input.value = input.value.trim()

    if (input.value.length < min || input.value.length > max) {
        showError(input, "Use 8 - 32 characters for your password")
    } else {
        showSuccess(input)
        isPasswordError = false
    }
    return isPasswordError
}

function checkConfirmPassword(input, pref) {
    let isConfirmPasswordError = true
    input.value = input.value.trim()

    if (input.value == pref.value) {
        showSuccess(input)
        isConfirmPasswordError = false
    } else {
        showError(input, "The entered passwords do not match. Try again.")
    }
    return isConfirmPasswordError
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let isEmptyError = checkInputValue([username, email, password, confirmPassword])
    let isEmailError = checkEmail(email)
    let isUsernameError = checkUserName(username)
    let isPasswordError = checkPassword(password, 8, 30)
    let isConfirmPasswordError = checkConfirmPassword(confirmPassword, password)

    // Check empty input first
    checkInputValue([username, email, password, confirmPassword])

    // Check condition show popup after that
    if (!isEmptyError && !isEmailError && !isPasswordError && !isUsernameError && !isConfirmPasswordError) {
        showPopup()
        form.style.display = "none"
    }
})
