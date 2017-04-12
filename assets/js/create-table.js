var tableTemplate = require('../../templates/table.handlebars');
var table = document.querySelector('#table-content');
var loader = document.querySelector('.loader');

// create html by using handlebars template
var createHtml = function(data) {

	table.insertRow(-1).innerHTML = tableTemplate({
     repository_url: data.html_url,
     avatar_url:  data.owner.avatar_url,
		 name: data.name,
		 homepage: data.homepage,
     description: data.description
	});
}

/*
* Slice the array based on the current page
* Create the content for that portion of an array
* Param array repositories, integer page
*/
export function createTable(repositories, page) {
  var itemsPerPage = 20,
      offset = page*20;

  table.innerHTML = '';
  loader.style.display = 'none';

  repositories.slice(offset, offset+itemsPerPage).forEach(createHtml);
}
