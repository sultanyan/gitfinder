$(document).ready(function(){
    // Grab the user input via keyup event
    $('#searchUser').keyup(function(e){
        // Assign local username var to the pressed key's value
        let username = e.target.value;

        // Make request to github
        $.ajax({
            url: "https://api.github.com/users/" + username,
            data: {
                client_id: '08f255ea1edb6f2ef04d',
                client_secret: 'efe5a12a712936722fa31efb03fd54588c3cc105'
            }
        }).done(function(user){ // Pass data on promise. Using es6, format with bootstrap

            $.ajax({
                url: "https://api.github.com/users/" + username + "/repos", // Getting repositories
                data: {
                    client_id: '08f255ea1edb6f2ef04d',
                    client_secret: 'efe5a12a712936722fa31efb03fd54588c3cc105',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                $.each(repos, function(index, repo){
                    $('#repositories').append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name} </strong> <br /> ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="label label-default">Forks: ${repo.forks_count}</span>
                                    <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                                    <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-default">Visit</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
            $('#profile').html(`
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">${user.name}</h3>
                  </div>
                  <div class="panel-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${user.avatar_url}" alt="${user.name}'s avatar" class="thumbnail avatar" />
                            <a class="btn btn-primary btn-block" target="_blank" href="${user.html_url}">Visit ${user.name}'s profile</a>
                        </div>

                        <div class="col-md-9">
                            <span class="label label-default">Public Repositories: ${user.public_repos}</span>
                            <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                            <span class="label label-success">Followers: ${user.followers}</span>
                            <span class="label label-info">Following: ${user.following}</span>
                            <br /><br />

                            <ul class="list-group">
                                <li class="list-group-item">
                                    Company:
                                    ${user.company}
                                </li>
                                <li class="list-group-item">Website/Blog:
                                    ${user.blog}
                                </li>
                                <li class="list-group-item">Location:
                                    ${user.location}
                                </li>
                                <li class="list-group-item">Member Since: ${user.created_at}</li>
                            </ul>
                        </div>
                    </div>
                  </div>
                </div>
                <h3 class="page-header">Latest Repos</h3>
                <div id="repositories">

                </div>
            `)
        });
    });


});
