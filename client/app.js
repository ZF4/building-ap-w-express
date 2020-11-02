$(document).ready(function () {
    let btn = $("#submit-btn");
    const chirpContainer = $("#chirp-container");


    // const newChirp = () => {
    //     const name = nameInput.val();
    //     const chirp = chirpInput.val();
    //     const info = {
    //         user: name,
    //         text: chirp,
    //     }
    // }
    const timeLine = () => {
        $.get("/api/chirps/", function (data) {
            delete data.nextid;
            let chirpsArr = Object.values(data);
            chirpsArr.forEach((chirps) => {
                let chirpDiv =
                    ` <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
               <div class="card-header">${chirps.user}</div>
               <div class="card-body">
               <h5 class="card-title">${chirps.text}</h5>
               <button type="button" class="btn btn-danger" id="dlt-btn">X</button>
                    </div>
                </div>`
                $("#chirp-container").append(chirpDiv);
            })
            // console.log(chirpsArr)
        })
    }
    timeLine();

    $("#submit-btn").click(() => {
        const nameInput = $("#name-input").val();
        const chirpInput = $("#chirp-input").val();
        let newChirp = { user: nameInput, text: chirpInput };

        $.ajax({
            type: "POST",
            url: "/api/chirps/",
            headers: { "content-type": "application/json" },
            data: JSON.stringify(newChirp),
            success: () => {
                chirpContainer.empty();
                timeLine();
            }
        })
    })
    $("#dlt-btn").click(() => {
        console.log(id)
        $.ajax(`/api/chirps/${id}`, { method: "delete" });
        timeLine();

    })

})