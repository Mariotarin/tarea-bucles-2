const shuffle = (currentArray) => {
    const array = [...currentArray];
    let counter = array.length;

    while (counter > 0) {
        let randomIndex = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
};


// Build the tests array using the existing harness format
const tests = [];

const add = (name, fn, expect) => tests.push({ name, run: fn, expect });

// NEW: 10 ejercicios centrados en loops — Generador de tests (30 por ejercicio)

// Helpers para calcular expectativas de forma determinista
function expectSumUpTo(n) {
    if (typeof n !== 'number' || n <= 0) return 0;
    return (n * (n + 1)) / 2;
}

function expectFactorial(n) {
    if (typeof n !== 'number' || n < 0) return null;
    let res = 1;
    let i = n;
    while (i > 1) { res *= i; i--; }
    return res;
}

function expectEveryOtherChar(s) {
    if (typeof s !== 'string') return '';
    let out = '';
    for (let i = 0; i < s.length; i += 2) out += s[i];
    return out;
}

function expectFlattenOnce(a) {
    if (!Array.isArray(a)) return [];
    const out = [];
    for (const item of a) {
        if (Array.isArray(item)) {
            for (const sub of item) out.push(sub);
        } else out.push(item);
    }
    return out;
}

function expectCountInObject(obj, v) {
    if (obj == null || typeof obj !== 'object') return 0;
    let c = 0;
    for (const k in obj) if (obj[k] === v) c++;
    return c;
}

function expectAccumulateUntil(arr, limit) {
    if (!Array.isArray(arr) || arr.length === 0) return 0;
    let sum = 0, i = 0;
    do { sum += arr[i] || 0; i++; } while (i < arr.length && sum < limit);
    return sum;
}

function expectKeysWithPrefix(obj, prefix) {
    if (obj == null || typeof obj !== 'object') return [];
    const out = [];
    for (const k in obj) if (String(k).indexOf(prefix) === 0) out.push(k);
    return out;
}

function expectIntersection(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return [];
    const out = [];
    for (const item of a) {
        if (out.indexOf(item) !== -1) continue;
        for (const x of b) if (x === item) { out.push(item); break; }
    }
    return out;
}

function expectMapWithLoop(arr, fn) {
    if (!Array.isArray(arr)) return [];
    return arr.map(fn);
}

function expectFilterEvenIndices(arr) {
    if (!Array.isArray(arr)) return [];
    const out = [];
    for (let i = 0; i < arr.length; i++) if (i % 2 === 0) out.push(arr[i]);
    return out;
}

// Generar 30 tests por ejercicio

// 1) sumUpTo: valores -5..24 (30 casos)
for (let i = 0; i < 30; i++) {
    const n = i - 5;
    add(`sumUpTo #${i + 1}`, () => sumUpTo(n), expectSumUpTo(n));
}

// 2) factorial: mezcla de números, negativos y tipos no numéricos (30 casos)
const facInputs = [-3, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'a', null, undefined, {}, [], 11, 12, 13, 14, 15, '5', true, false, 16, 17, 18];
for (let i = 0; i < facInputs.length; i++) {
    const v = facInputs[i];
    add(`factorial #${i + 1}`, () => factorial(v), expectFactorial(v));
}

// 3) everyOtherChar: 30 cadenas variadas
const sampleStrings = ['', 'a', 'ab', 'abc', 'abcd', 'abcde', 'abcdef', 'hello!', '¡Hola!', '🙂🙃🙂', '1234567890', 'a b c d', 'xx', 'xyz', 'longstringtestforloops', null, undefined, 42, {}, [], 'space bar', 'ends ', ' start', 'middle', '🚀rocket', 'mañana', 'áéíóú', 'ß', 'ø', '中文测试'];
for (let i = 0; i < sampleStrings.length; i++) {
    const s = sampleStrings[i];
    add(`everyOtherChar #${i + 1}`, () => everyOtherChar(s), expectEveryOtherChar(s));
}

// 4) flattenOnce: arrays variados
const flattenInputs = [[], [1, [2, 3], 4], [[1], [2], [3]], [[1, 2], 3, [4, [5]]], [null, [undefined], 'a'], [[[1]], 2], 'notarray', 0, [[], []], [[[]]], [1, 2, 3], [[1, [2]], 3], [[1], 2, [3, 4]], [true, [false]], [{}, [{}]], [[1, 2, 3]], [[1], [2, 3], 4, 5], [[[]], [[]]], [[null], null], [[undefined], undefined], [[0], 0], [[-1], -1], [[1], '1'], [[2], [3]], [[4, 5], [6]], [[7], 8, [9]], [['a'], 'b'], [['x', 'y'], 'z'], [[['deep']], 'shallow']];
for (let i = 0; i < flattenInputs.length; i++) {
    const a = flattenInputs[i];
    add(`flattenOnce #${i + 1}`, () => flattenOnce(a), expectFlattenOnce(a));
}

// 5) countInObject: objetos variados
const countObjs = [[{}, 'x'], [{ a: 1, b: 2, c: 1 }, 1], [{ x: 'a', y: 'a', z: 'b' }, 'a'], [{ a: true, b: false, c: true }, true], [null, 'a'], [[], 0], [{ 0: 'zero', 1: 'one' }, 'one'], [{ a: undefined, b: undefined }, undefined], [{ a: NaN, b: NaN }, NaN], [{ a: '1', b: 1 }, 1]];
for (let i = 0; i < 30; i++) {
    const pair = countObjs[i % countObjs.length];
    const obj = pair[0];
    const val = pair[1];
    add(`countInObject #${i + 1}`, () => countInObject(obj, val), expectCountInObject(obj, val));
}

// 6) accumulateUntil: arrays y límites variados
const accCases = [[[1, 2, 3, 4], 5], [[10, 1], 5], [[], 5], [[1, 1, 1], 5], [[5, 5], 5], [[0, 0, 0], 1], [[2, 2, 2, 2], 7], [[-1, -2, 10], 5], [[1], 1], [[1], 2]];
for (let i = 0; i < 30; i++) {
    const c = accCases[i % accCases.length];
    add(`accumulateUntil #${i + 1}`, () => accumulateUntil(c[0], c[1]), expectAccumulateUntil(c[0], c[1]));
}

// 7) keysWithPrefix: objetos y prefijos
const keyCases = [[{}, 'x'], [{ pre_a: 1, b: 2, pre_b: 3 }, 'pre_'], [{ a: 1, ab: 2, abc: 3 }, 'a'], [{ 'x1': 1, 'x2': 2 }, 'x'], [{ '': 0, a: 1 }, ''], [{ 'pre': 1, 'prefix': 2 }, 'pre'], [{ 'mañana': 1, 'manana': 2 }, 'ma'], [{ 0: 1, 1: 2 }, '0'], [{ 'a-b': 1, 'a_c': 2 }, 'a-'], [{ longkey: 1, long: 2 }, 'long']];
for (let i = 0; i < 30; i++) {
    const c = keyCases[i % keyCases.length];
    add(`keysWithPrefix #${i + 1}`, () => keysWithPrefix(c[0], c[1]), expectKeysWithPrefix(c[0], c[1]));
}

// 8) intersection: pares de arrays
const interCases = [[[1, 2, 3], [3, 4]], [['a', 'b'], ['b', 'c']], [[1, 2], [3, 4]], [[], [1, 2]], [[1, 1, 2], [1, 3]], [[null, undefined], [undefined]], [['x', 'y', 'z'], ['z', 'x']], [[true, false], [false]], [[{ a: 1 }], [{ a: 1 }]], [[1, '1'], ['1', 1]]];
for (let i = 0; i < 30; i++) {
    const c = interCases[i % interCases.length];
    add(`intersection #${i + 1}`, () => intersection(c[0], c[1]), expectIntersection(c[0], c[1]));
}

// 9) mapWithLoop: arrays y funciones
const mapCases = [[[], x => x * 2], [[1, 2, 3], x => x + 1], [['a', 'b'], s => s + '!'], [[1, 2, 3], (v, i) => v * i], [[true, false], v => !v], [[null, undefined], v => String(v)], [[0, 1, 2, 3], (v, i, a) => (a.length + v + i)], [[-1, -2], v => v * -1]];
for (let i = 0; i < 30; i++) {
    const c = mapCases[i % mapCases.length];
    const arr = c[0];
    const fn = c[1];
    add(`mapWithLoop #${i + 1}`, () => mapWithLoop(arr, fn), expectMapWithLoop(arr, fn));
}

// 10) filterEvenIndices: arrays variados
const filtCases = [[[0, 1, 2, 3, 4]], [['a']], [[]], [[1, 2, 3, 4, 5, 6]], [[true, false, true]], [[null, 'x', 'y', null]], [[0]], [[1]], [[1, 2]], [[1, 2, 3]]];
for (let i = 0; i < 30; i++) {
    const arr = filtCases[i % filtCases.length][0];
    add(`filterEvenIndices #${i + 1}`, () => filterEvenIndices(arr), expectFilterEvenIndices(arr));
}



function deepEqual(a, b) {
    try {
        return JSON.stringify(a) === JSON.stringify(b);
    } catch (e) {
        return a === b;
    }
}

function formatValue(v) {
    if (typeof v === "string") return `"${v}"`;
    try { return JSON.stringify(v); } catch { return String(v); }
}

function runAll() {
    const container = document.getElementById("exercises");
    container.innerHTML = "";

    const groups = {};
    tests.forEach(t => {
        const idx = t.name.indexOf(" #");
        const key = idx > -1 ? t.name.slice(0, idx) : t.name;
        if (!groups[key]) groups[key] = [];
        groups[key].push(t);
    });

    let passed = 0, failed = 0;

    Object.keys(groups).forEach(exName => {
        const group = groups[exName];

        const exEl = document.createElement('div');
        exEl.className = 'exercise';

        const header = document.createElement('button');
        header.className = 'exercise-header';
        header.type = 'button';
        header.setAttribute('aria-expanded', 'false');
        header.innerHTML = `<span class="ex-title">${exName}</span><span class="ex-counts">✅ <span class="ex-passed">0</span> ❌ <span class="ex-failed">0</span></span>`;

        const body = document.createElement('div');
        body.className = 'exercise-body';
        body.hidden = true;

        const left = document.createElement('div');
        left.className = 'subsection correct';
        left.innerHTML = '<h4>Correct</h4>';
        const ulCorrect = document.createElement('ul');
        ulCorrect.className = 'list correct-list';
        left.appendChild(ulCorrect);

        const right = document.createElement('div');
        right.className = 'subsection fail';
        right.innerHTML = '<h4>Failed</h4>';
        const ulFail = document.createElement('ul');
        ulFail.className = 'list fail-list';
        right.appendChild(ulFail);

        body.appendChild(left);
        body.appendChild(right);

        exEl.appendChild(header);
        exEl.appendChild(body);

        container.appendChild(exEl);

        let exPassed = 0, exFailed = 0;

        group.forEach(t => {
            let received;
            let ok = false;
            // Special convention: if expect is a string beginning with 'THROW:'
            if (typeof t.expect === 'string' && t.expect.indexOf('THROW:') === 0) {
                const expectedMessage = t.expect.slice(6);
                try {
                    // should throw
                    const r = t.run();
                    received = formatValue(r);
                    ok = false; // didn't throw
                } catch (err) {
                    received = `Error: ${err.message || err}`;
                    ok = (err.message === expectedMessage);
                }
            } else {
                try {
                    received = t.run();
                    ok = deepEqual(received, t.expect);
                } catch (err) {
                    received = `Error: ${err.message || err}`;
                    ok = false;
                }
            }

            const li = document.createElement('li');
            li.className = ok ? 'pass' : 'fail';
            li.innerHTML = `<div class="row-label">${t.name}</div>
            <div class="small">Expected: <span class="expected">${formatValue(t.expect)}</span></div>
            <div class="small">Received: <span class="received">${formatValue(received)}</span></div>`;

            if (ok) {
                ulCorrect.appendChild(li);
                exPassed++; passed++;
            } else {
                ulFail.appendChild(li);
                exFailed++; failed++;
            }
        });

        header.querySelector('.ex-passed').textContent = exPassed;
        header.querySelector('.ex-failed').textContent = exFailed;

        header.addEventListener('click', () => {
            const expanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            body.hidden = expanded ? true : false;
        });
    });

    document.getElementById("passed").textContent = passed;
    document.getElementById("failed").textContent = failed;
    document.getElementById("total").textContent = tests.length;
}

function runTest(id) {
    let chosen = [];
    if (typeof id === 'number') {
        const idx = id - 1;
        if (idx >= 0 && idx < tests.length) chosen = [tests[idx]];
        else return [];
    } else if (typeof id === 'string') {
        const exact = tests.find(t => t.name === id);
        if (exact) chosen = [exact];
        else {
            chosen = tests.filter(t => t.name.startsWith(id + ' #') || t.name === id);
        }
    } else {
        return [];
    }

    const results = chosen.map(t => {
        // handle THROW: expectation
        if (typeof t.expect === 'string' && t.expect.indexOf('THROW:') === 0) {
            const expectedMessage = t.expect.slice(6);
            try {
                const received = t.run();
                return { name: t.name, ok: false, received, expect: t.expect };
            } catch (err) {
                const received = `Error: ${err.message || err}`;
                const ok = (err.message === expectedMessage);
                return { name: t.name, ok, received, expect: t.expect };
            }
        }

        try {
            const received = t.run();
            const ok = deepEqual(received, t.expect);
            return { name: t.name, ok, received, expect: t.expect };
        } catch (err) {
            return { name: t.name, ok: false, received: `Error: ${err.message || err}`, expect: t.expect };
        }
    });

    return results;
}

runAll();

document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
        const exercises = Array.from(document.querySelectorAll('#exercises .exercise')).map(ex => {
            const name = ex.querySelector('.ex-title')?.innerText || '';
            const passed = Number(ex.querySelector('.ex-passed')?.textContent || 0);
            const failed = Number(ex.querySelector('.ex-failed')?.textContent || 0);
            const correct = Array.from(ex.querySelectorAll('.correct-list li')).map(li => ({
                test: li.querySelector('.row-label')?.innerText?.trim() || '',
                expected: li.querySelector('.expected')?.innerText?.trim() || '',
                received: li.querySelector('.received')?.innerText?.trim() || ''
            }));
            const failedList = Array.from(ex.querySelectorAll('.fail-list li')).map(li => ({
                test: li.querySelector('.row-label')?.innerText?.trim() || '',
                expected: li.querySelector('.expected')?.innerText?.trim() || '',
                received: li.querySelector('.received')?.innerText?.trim() || ''
            }));
            return { name, passed, failed, correct, failed: failedList };
        });

        navigator.clipboard?.writeText(JSON.stringify(exercises, null, 2)).then(() => {
            alert('Results copied to clipboard (JSON).');
        }).catch(() => alert('Could not copy to clipboard.'));
    });
});