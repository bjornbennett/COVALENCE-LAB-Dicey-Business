// Classes
class Die{
    constructor(min, max){
        this.min = min;
        this.max = max;

        this.roll = function(min, max){
            let value = Math.floor( Math.random() * (max - min) + min );
            return value;
        }
    }
}

// DOM
document.addEventListener('DOMContentLoaded', ()=>{

    // testing testing
    // const cl = console.log;

    // set targets
    const divTarget = document.getElementById('dice-container');
    const btnTarget = document.getElementById('button-container');
    
    // generate button
    createBtn('Sum Die', 'sum-die', 'coins',3); 
    createBtn('Roll Die', 'roll-die', 'hand-paper', 2); 
    createBtn('New Die', 'generate-die', 'dice', 1); 
    createBtn('Clear All', 'clear-die', 'sync', 4); 
    disableBtns();

    // create button function
    function createBtn(btnText, btnId, btnIcon, btnReact){
        let btn = document.createElement('button'),
            btnTxtNode = document.createTextNode(btnText),
            btnIconSpan = document.createElement('span');
        
        btnIconSpan.classList.add('fa');
        btnIconSpan.classList.add('fa-' + btnIcon);

        btn.appendChild(btnTxtNode);
        btn.appendChild(btnIconSpan);
        btn.setAttribute('id', btnId)
        btnTarget.prepend(btn);

        if(btnReact == 1){ // create new die logic
            // target is gen btn
            let target = document.getElementById(btnId);
            
            // add click event
            target.addEventListener('click', function(){
                // cl('New Die Created!');
                
                let btnArray = document.querySelectorAll('button');
                btnArray.forEach(element => {
                    element.removeAttribute('disabled');
                });

                // setup: new die number, and new div
                let newDie = new Die().roll(1,7),
                    newDiv = document.createElement('div');
                    newTextNode = document.createTextNode(newDie);

                // find class name
                let classNumb = swapNumbImg(newDie);
                
                // add new class name
                newDiv.classList.add(classNumb);
                newDiv.appendChild(newTextNode);
                
                // add event click listener
                newDiv.addEventListener('click', function(){
                    hideSumBlock();
                    let newerDie = new Die().roll(1,7);
                    this.innerHTML = newerDie;
                    this.classList = swapNumbImg(newerDie);
                    // cl(this);
                });
                newDiv.addEventListener('dblclick', function(){
                    document.querySelector('body').classList.add('overflow-hidden');
                    newDiv.style.opacity = 0;

                    let diceContainer = document.querySelector('#dice-container').textContent.length;
                    if(diceContainer - 1 == '0'){
                        disableBtns();
                        // cl(diceContainer);
                    }
                    setTimeout(function(){
                        newDiv.style.opacity = 1;
                        newDiv.classList = 'smoke';
                    }, 200);
                    setTimeout(function(){
                        newDiv.remove();
                        document.querySelector('body').classList = "";
                    }, 700);
                    hideSumBlock();
                });

                // append to block
                divTarget.appendChild(newDiv);
                hideSumBlock();

                checkDivArray();
            });
        } else if(btnReact == 2){ // roll die logic

            let target = document.getElementById(btnId);
            target.setAttribute('disabled', true);
            
            target.addEventListener('click', function(){
                let allDie = document.querySelectorAll('#dice-container div');
                
                allDie.forEach(element => {
                    let newDieNumb = new Die().roll(1,6);
                    // find class name
                    let classNumb = swapNumbImg(newDieNumb);
                    element.innerHTML = newDieNumb;
                    element.className = classNumb;
                });
                hideSumBlock();
                checkDivArray();
            });
        } else if(btnReact == 3){ // sum die logic
            let target = document.getElementById(btnId);
            target.setAttribute('disabled', true);
            
            target.addEventListener('click', function(){
                let allDie = document.querySelectorAll('#dice-container div');
                let sumCount = 0;
                allDie.forEach(element => {
                    sumCount += parseInt(element.textContent);
                });
                let target = document.querySelector('#dice-announcement span');
                let targetParent = document.querySelector('#dice-announcement');
                let textNode = document.createTextNode(sumCount);
                target.innerHTML = "";
                target.appendChild(textNode);
                targetParent.className = 'reveal';
            });
        } else if(btnReact == 4){ // create clear die logic

            let target = document.getElementById(btnId);
            target.addEventListener('click', function(){
                document.querySelector('#dice-container').innerHTML = "";
                disableBtns();
                hideSumBlock();
            });
        }
        function checkDivArray(){
            let allDivArray = document.querySelectorAll('#dice-container div');
        }
        function swapNumbImg(val){
            if(val == 1){
                return 'one';
            } else if(val == 2){
                return 'two';
            } else if(val == 3){
                return 'three';
            } else if(val == 4){
                return 'four';
            } else if(val == 5){
                return 'five';
            } else if(val == 6){
                return 'six';
            }
        }
        function hideSumBlock(){
            let targetParent = document.querySelector('#dice-announcement');
                targetParent.className = '';
        }
    }
    function disableBtns(){
        document.querySelector("#roll-die").setAttribute('disabled', true);
        document.querySelector("#sum-die").setAttribute('disabled', true);
        document.querySelector("#clear-die").setAttribute('disabled', true);
    }

});