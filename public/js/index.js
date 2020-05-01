

$(document).ready(function () {

    $.ajax({
        method: "GET",
        url: "/api/plans"
    }).then(allPLans => {
        allPLans.forEach(plan => {

            let newOption = $('<option>');
            let newOptionVal = plan.name;
            newOption.append(newOptionVal);
            newOption.attr("value", plan.name);
            $(`#choosePlan`).append(newOption);
            let newOption1 = $('<option>');
            let newOption1Val = plan.name;
            newOption1.append(newOption1Val);
            newOption1.attr("value", plan.name);
            $(`#choosePlanView`).append(newOption1);
        });
    })

    $('#choosePlan').on("submit", function (event) {
        console.log($("#choosePlan").val());

    })


    $('#planViewBtn').on("click", function () {
        event.preventDefault();
        $('#exerciseViewCont').empty()
        let planName = $('#choosePlanView').val()
        $.ajax({
            method: "GET",
            url: "/populated/" + planName,
        }).then(function (res) {
            if(res){$('#exerciseViewCont').removeClass("d-none")}
            let exercises = res.exercises
            console.log(exercises);
            exercises.forEach(exercise => {
                const exerciseCardHTML = `
            <div class="card" style="width: auto;">
            <div class="card-body">
            <h3 class="card-title">${exercise.name}</h3>
            </div>
             <ul class="list-group list-group-flush" id="exerciseSpec${exercise._id}">
             </ul>
            </div>`
                $('#exerciseViewCont').append(exerciseCardHTML);
                if (exercise.type) {
                    const newLI = $('<li class="list-group-item">');
                    const newtext = `type: ${exercise.type}`;
                    newLI.append(newtext);
                    $(`#exerciseSpec${exercise._id}`).append(newLI);
                }
                if (exercise.weight) {
                    const newLI = $('<li class="list-group-item">');
                    const newtext = `weight: ${exercise.weight}`;
                    newLI.append(newtext);
                    $(`#exerciseSpec${exercise._id}`).append(newLI);
                }
                if (exercise.reps) {
                    const newLI = $('<li class="list-group-item">');
                    const newtext = `Reps: ${exercise.reps}`;
                    newLI.append(newtext);
                    $(`#exerciseSpec${exercise._id}`).append(newLI);
                }
                if (exercise.sets) {
                    const newLI = $('<li class="list-group-item">');
                    const newtext = `sets: ${exercise.sets}`;
                    newLI.append(newtext);
                    $(`#exerciseSpec${exercise._id}`).append(newLI);
                }
                if (exercise.distance) {
                    const newLI = $('<li class="list-group-item">');
                    const newtext = `distance: ${exercise.distance}`;
                    newLI.append(newtext);
                    $(`#exerciseSpec${exercise._id}`).append(newLI);
                }
                if (exercise.duration) {
                    const newLI = $('<li class="list-group-item">');
                    const newtext = `duration: ${exercise.duration}`;
                    newLI.append(newtext);
                    $(`#exerciseSpec${exercise._id}`).append(newLI);
                }

                // console.log(exerciseCardHTML);

                // $('<li class="list-group-item">')
            });




        })

    })

})