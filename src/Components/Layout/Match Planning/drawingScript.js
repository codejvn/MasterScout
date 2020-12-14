window.addEventListener("load", () => {
    let laptop = true;
    try {
        const canvas = document.querySelector("#canvas");
        const ctx = canvas.getContext("2d");

        const field = document.getElementById("image");

        canvas.width = window.innerWidth - 300;
        canvas.height = canvas.width / 2;

        ctx.drawImage(field, 0, 0, canvas.width, canvas.width / 2);

        let painting = false;
        let color = "white";

        function startPaint() {
            painting = true;
            console.log("STARTED")
        }
        function endPaint() {
            painting = false;
            ctx.beginPath();
        }
        function draw(e) {
            if (painting && !laptop) {
                ctx.lineWidth = 5;
                ctx.lineCap = "round";
                ctx.lineTo(e.touches[0].clientX - 240, e.touches[0].clientY - 51.5);
                ctx.strokeStyle = color;
                ctx.stroke();
            }
            else if(painting){
                ctx.lineWidth = 5;
                ctx.lineCap = "round";
                ctx.lineTo(e.clientX - 240, e.clientY - 51.5);
                ctx.strokeStyle = color;
                ctx.stroke();
            }
        }
        function red() {
            color = "red";
            console.log("changing to red");
        }
        function blue() {
            color = "blue";
            console.log("changing to blue");
        }
        function green() {
            color = "limegreen";
            console.log("changing to green");
        }
        function purple() {
            color = "magenta";
            console.log("changing to purple");
        }
        function yellow(){
            color = "yellow";
            console.log("changing to yellow");
        }
        function toggleTouch(){
            laptop = false;
        }
        function toggleLap(){
            laptop = true;
        }
        document.getElementById("laptop").addEventListener("click", toggleLap);
        document.getElementById("touch").addEventListener("click", toggleTouch)
        document.getElementById("red").addEventListener("click", red);
        document.getElementById("blue").addEventListener("click", blue);
        document.getElementById("green").addEventListener("click", green);
        document.getElementById("purple").addEventListener("click", purple);
        document.getElementById("yellow").addEventListener("click", yellow);

        canvas.addEventListener("touchstart", startPaint);
        canvas.addEventListener("touchend", endPaint);
        canvas.addEventListener("touchmove", draw);

        //prevent dragging on touchmove for better drawing

        function preventBehavior(e) {
            e.preventDefault();
        };

        document.addEventListener("touchmove", preventBehavior, { passive: false });

    } catch (err) {
    }
});