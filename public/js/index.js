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

    $('#choosePlan option').change(function (event) {
        console.log($(this).text());

    })

    $('#planViewBtn').on("click", function () {
        event.preventDefault();
        console.log("click");
        console.log($('#choosePlanView').val());
        let planName = $('#choosePlanView').val()
        console.log(planName);

        $.ajax({
            method: "GET",
            url: "/populated/" + planName,
        }).then(function (res) {
            let exercises = res.exercises
            console.log(exercises);
            exercises.forEach(exercise => {
                $('<li class="list-group-item">')
            });




        })

    })

})