
function F(x) {
    return x * x - Math.cos(x);
}

function leftRiemannSum(func, a, b, n) {
    const dx = (b - a) / n; 
    let sum = 0;
    
    for (let i = 0; i < n; i++) {
        const x_i = a + i * dx; 
        sum += func(x_i) * dx;
    }
    
    return sum;
}

function integrate(func, a, b, n = 1000) {
    return leftRiemannSum(func, a, b, n);
}

function integrateWithPrompt() {
    hideResult();
    hideError();
    
    try {
        const a = parseFloat(prompt("Введите нижний предел интегрирования (a):"));
        if (isNaN(a)) {
            throw new Error("Некорректное значение для нижнего предела");
        }
        
        const b = parseFloat(prompt("Введите верхний предел интегрирования (b):"));
        if (isNaN(b)) {
            throw new Error("Некорректное значение для верхнего предела");
        }
        
        if (a >= b) {
            throw new Error("Верхний предел должен быть больше нижнего предела");
        }
        
        const nInput = prompt("Введите количество точек разбиения (по умолчанию 1000):");
        let n = 1000;
        if (nInput && !isNaN(parseInt(nInput)) && parseInt(nInput) > 0) {
            n = parseInt(nInput);
            if (n < 10) n = 10;
            if (n > 100000) n = 100000;
        }
        
        const result = integrate(F, a, b, n);
        displayResult(result, a, b, n);
        
    } catch (error) {
        showError(error.message);
    }
}

function integrateWithForm() {
    hideResult();
    hideError();
    
    try {
        const a = parseFloat(document.getElementById('a').value);
        const b = parseFloat(document.getElementById('b').value);
        const n = parseInt(document.getElementById('n').value);
        
        if (isNaN(a)) {
            throw new Error("Введите корректное значение для нижнего предела");
        }
        
        if (isNaN(b)) {
            throw new Error("Введите корректное значение для верхнего предела");
        }
        
        if (a >= b) {
            throw new Error("Верхний предел должен быть больше нижнего предела");
        }
        
        if (isNaN(n) || n < 10) {
            throw new Error("Количество точек разбиения должно быть целым числом не менее 10");
        }
        
        const result = integrate(F, a, b, n);
        displayResult(result, a, b, n);
        
    } catch (error) {
        showError(error.message);
    }
}

function displayResult(result, a, b, n) {
    const resultElement = document.getElementById('result');
    const resultValueElement = document.getElementById('resultValue');
    const methodInfoElement = document.getElementById('methodInfo');
    
    resultValueElement.textContent = `∫[${a.toFixed(2)}, ${b.toFixed(2)}] (x² - cos(x)) dx ≈ ${result.toFixed(6)}`;
    methodInfoElement.textContent = `Метод: левые прямоугольники, точек разбиения: ${n}`;
    
    resultElement.style.display = 'block';
}

function showError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError() {
    document.getElementById('error').style.display = 'none';
}

function hideResult() {
    document.getElementById('result').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Let's integrate!");
});