let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let hide = document.querySelector(".hide");
let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];


    const reset = () => {
        turnO = true;
        // Iterate through each box in the boxes NodeList
        boxes.forEach((box) => {
          box.disabled = false;
          box.innerText = "";
        });
        hide.classList.add("hide");
      };


const disableBoxes = () =>
    {
        for (const box of boxes) {
box.disabled = true;            
        }
    }
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO === true) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = "true"; // to disable clicks on same box two times

    checkwinner();
  });
});

const msgShow = (winner) => 
    {
        msg.innerText = ` Winner is ${winner}`;
        hide.classList.remove("hide");
    }

const checkwinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    // checking if there is input and than check conditions

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) 
    {
        disableBoxes();
          msgShow(pos1val);
    }
    }
  }
};

resetBtn.addEventListener("click",reset);