import { getUsefulContents } from './ajax';
import { createContent } from './create-content';

var url = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100';

/*
* Fetch the data from a remote endpoint
* @param url, data callback
* store fetched data into an array repositories
* call createContent and send repositories and number of pages as parameters   
*/
getUsefulContents(url, data => {
  var repositories = data.items;
  var itemsPerPage = 20;
  var numberOfPages = Math.ceil(repositories.length/itemsPerPage);

  createContent(repositories, numberOfPages);
});
