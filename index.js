//Массив начальных значений
let startArr = [
    { fullName: { surname: 'xxx', firstName: 'yyy', middleName: { surname: 'xxx', firstName: 'yyy', middleName: 'zzz' } } },
    { fullName: { surname: 'XXX', firstName: 'YYY', middleName: 'ZZZ'}}
]
//Массив-результат который должен быть
let finishArr = [
    { name: "Прізвище", value1: "xxx", value2: "XXX" },
    { name: "firstName", value1: "yyy", value2: "YYY" }
]
//Правило преобразований
let changeArr = {
    fullName: {
        surname: true,
        firstName: true,
        middleName: {
            surname: true,
            firstName: true,
            middleName: true,
        }
    }
}

//Правило локализации
let localArr = { "fullName.surname": "Прізвище", "fullName.middleName": "По-батькові" }


function ourFunc(startArr, changeArr, localArr) {

    let deleteProp = [] // Массив для хранения удаленных свойств по правилу преобразований
    for (let obj in changeArr) {
        for (let prop in changeArr[obj]) {
            if (changeArr[obj][prop] == false) {
                deleteProp.push(prop)
            }
        }
    }
    console.log(deleteProp)
    console.log('---------------')
    let test = [] //Видоизмененный начальный массив для удобной работы с ним
    for (let obj of startArr) {
        for (let prop in obj) {
            test.push(obj[prop])
        }
    }
    console.log(test)
    console.log('---------------')
    for (i = 0; i < deleteProp.length; i++) { //Удаляем свойство на котором флаг false из массива deleteProp
        for (let obj in test) {
            delete test[obj][deleteProp[i]]
        }
    }
    console.log(test)
    console.log('--------------')
    for (let obj of test) {//Используем правило локализации на примере массива localArr
        for (let prop in obj) {
            for (let properties in localArr) {
                if (properties.search(prop) > 0) {
                    a = obj[prop]
                    delete obj[prop]
                    obj[localArr[properties]] = a
                }
            }
        }
    }
    console.log(test)
    console.log('--------------')
    let test2 = [] // Массив для свойств у которых флаг true
    for (let obj of test) {
        for (let prop in obj) {
            test2.push(prop)
        }
    }
    console.log(test2)
    console.log('--------------')

    test2 = test2.filter((item, index) => test2.indexOf(item) === index)//Отсеиваем повторяющеейся

    console.log(test2)
    console.log('--------------')

    let finalArr = [] //Результирующий массив
    for (let i = 0; i < test2.length; i++) {//Создаем количество объектов равной количеству массивов с флагом true
        finalArr.push(new Object({
            name: test2[i]//Иницилизируем название первого свойства name и добавляем свойства начального массива по правилу локализации
        }))
    }
    console.log(finalArr)
    console.log('------------')
    let z = 0 //Вспомогательная переменная для номеров в конце названия свойств
    for (let OBJ of finalArr) {//Добавляем свойства с их номерами среди других свойств в даном объекте
        for (let properties in OBJ) {
            for (let obj of test) {
                for (let prop in obj) {
                    if (OBJ[properties] == prop) {
                        OBJ['value' + ++z] = obj[prop]
                    }
                }
            }
        }
        z = 0
    }
    console.log(finalArr)
    console.log('------------')
    for (let OBJ of finalArr) {//Проверки типов данных и дополнительных условий
        for (let properties in OBJ) {
            if (OBJ[properties] instanceof Date) {//Является значение свойств датой если да - формируем в нужный формат
                OBJ[properties] = OBJ[properties].getDate() + '.' + OBJ[properties].getMonth() + '.' + OBJ[properties].getFullYear()
            }
            if (OBJ[properties] == true) {//Является значение свойств boolean - true
                OBJ[properties] = 'Так'
            }
            if (OBJ[properties] == false) {//Является значение свойств boolean - false
                OBJ[properties] = 'Ні'
            }
        }
    }

    return finalArr
}

let changeSecondArr = {}
let startSecondArr = []

for (let obj in changeArr) {//Добавляем вложеный объект условий
    for (prop in changeArr[obj]) {
        if (typeof changeArr[obj][prop] == 'object') {
            changeSecondArr[prop] = changeArr[obj][prop]
        }
    }
}
console.log('--------------------------------------------------------')
console.log(changeSecondArr)
console.log('--------------------------------------------------------')

for (let obj of startArr) {//Добавляем вложеный объект начального массива
    for (let prop in obj) {
        for (let OBJ in obj[prop]) {
            if (typeof obj[prop][OBJ] == 'object') {
                // obj[prop][OBJ] = ourFunc(obj[prop][OBJ], changeSecondArr, localArr)
                let Obj = {}
                Obj[OBJ] = obj[prop][OBJ]
                startSecondArr.push(Obj)
            }
        }
    }
}
for (let obj of startArr) {// Меняем вложеный объект начального массива
    for (let prop in obj) {
        for (let OBJ in obj[prop]) {
            if (typeof obj[prop][OBJ] == 'object') {
                console.log(obj[prop][OBJ] = ourFunc(startSecondArr, changeSecondArr, localArr))
            }
        }
    }
}

console.log(startSecondArr)
console.log('--------------------------------------------------------')
console.log(startArr)
console.log('--------------------------------------------------------')



let final = ourFunc(startArr, changeArr, localArr)
console.log(final)




