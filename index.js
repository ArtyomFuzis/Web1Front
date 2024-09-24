$(function(){
    function show_res(s)
    {
        $("#row_res").removeAttr("hidden").html(s)
    }
    function add_row_end(x,y,r,msg)
    {
        $("#res_table")[0].innerHTML+=`<thead>\n` +
            `                        <td>${x}</td>\n` +
            `                        <td>${y}</td>\n` +
            `                        <td>${r}</td>\n` +
            `                        <td>${msg}</td>\n` +
            `                        </thead>`;
    }
    $(".ch").click(function(){
        if(this.checked)
        {
            $(".ch").prop('checked', false)
            $(this).prop('checked', true)
        }
    });
    $("#submit").click(function(){
        let ch = $(".ch:checked")
        let rad = $(".rad:checked")
        if(ch.length === 0 && rad.length === 0)
        {
            show_res("X и R не выбраны!")
        }
        else if(ch.length === 0)
        {
            show_res("X не выбран!")
        }
        else if(rad.length === 0)
        {
            show_res("R не выбран!")
        }
        else
        {
            let inp_y = $("#inp_y")[0].value.trim();
            if(inp_y.length === 0)
            {
                show_res("Y не выбран!")
            }
            else if(!inp_y.match("^-?\\d+(?:[\\.,]\\d+)?$"))
            {
                show_res("Y не является числовым значением!")
            }
            else {
                let parsed_y = parseFloat(inp_y.replace(",","."))
                if(parsed_y < -5 || parsed_y > 5)show_res("Y выходит за допустимые пределы!");
                else {
                    let data = {
                        x: ch.parent().children().last()[0].innerText,
                        r: rad.parent().children().last()[0].innerText,
                        y: parsed_y
                    }
                    $.ajax({
                        type: "GET",
                        url: "/fcgi-bin/JustCGI.jar",
                        data,
                        success: function (msg) {
                            show_res(msg);
                            add_row_end(data.x,data.y,data.r,msg);
                        }
                    });
                }
            }
        }
    });
});