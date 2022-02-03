$(document).ready(function () {
    var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
    $('#createButton').click(function() {
        var serializedData = $('#createTaskForm').serialize();
        console.log(serializedData)
        $.ajax({
            url: $("createTaskForm").data('url'),
            data: serializedData,
            type: 'post',
            success: function (response) {
                todo_item = '<div class="card mb-1" id="taskCard" data-id="' + response.task.id + '">'
                todo_item += '<div class="card-body">'
                todo_item += response.task.title + " " + response.task.target_date
                todo_item += '<button type="button" class="close float-right" id="todoDelete" data-id="' + response.task.id + '">Delete</button>'
                todo_item += '<button type="button" class="close float-right" id="todoDone" data-id="' + response.task.id + '">Update</button></div></div>'
                $("#taskList").append(todo_item)
            }
        })
        $("#createTaskForm")[0].reset();
    });

    $("#taskList").on('click', '#todoDone', function () {
        var dataId = $(this).data('id');
        $.ajax({
            url: '/todos/' + dataId + '/completed/',
            data: {
                csrfmiddlewaretoken: csrfToken,
                id: dataId
            },
            type: 'post',
            success: function () {
                var cardItem = $('#taskCard[data-id="' + dataId + '"]');
                cardItem.css('text-decoration', 'line-through').hide().slideDown();
                $("#taskList").append(cardItem);
            }
        });
    }).on('click', '#todoDelete', function (event) {
        event.stopPropagation();

        var dataId = $(this).data('id');

        $.ajax({
            url: '/todos/' + dataId + '/delete/',
            data: {
                csrfmiddlewaretoken: csrfToken,
                id: dataId
            },
            type: 'post',
            dataType: 'json',
            success: function () {
                $('#taskCard[data-id="' + dataId + '"]').remove();
            }
        })
    });
});
