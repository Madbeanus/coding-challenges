
// Note: This is an attempt to bring the functionality of the javascript contained
// in index.html to a more convenient-to-use format by using classes. It will represent
// a candidate and a list of candidates which could be displayed in various ways by
// calling class functions like toTable() for example. It allows easy expansion.

// This is my first time properly using JavaScript and I have attempted to learn the
// necessary syntax as best as possible.
"use strict"

/* represents a single candidate with a name and a skill */
class Candidate {
  constructor(name, skills) {
    this.name = name;
    this.skills = skills;
  }
}

/* represents a group of candidate objects contained in a list              *
 * esentially the class realisation of the object list format in index.html */
class Candidates {
  constructor(candidateList) {
    // orignal list is kept in case needed
    this.originalCandidateList = []
    candidateList.forEach(candidate => this.originalCandidateList.push(new Candidate(candidate.name, candidate.skills)));

    // initialise this as original because it is the one to be displayed and
    // filtered on, means user does not have to call filter by skill if they dont want to
    this.finalCandidateList = this.originalCandidateList
  }

  /* cuts down the final candidate list to contain elements with the specified skill */
  filterCandidatesBySkill(skill) {
    // gives the user an option to retrieve original list once filtering has already occured
    if(skill=="*") {
      this.finalCandidateList = this.originalCandidateList;
      return;
    }
    // filter
    this.finalCandidateList = []
    this.originalCandidateList.forEach(candidate => {
      // check if the skills array includes the specified skill
      if(candidate.skills.includes(skill)) {
        // if yes add to list to be displayed
        this.finalCandidateList.push(candidate);
      }
    });
  }

  /* appends new candidate to list */
  addCandidate(candidate) {
    this.originalCandidateList.push(new Candidate(candidate.name, candidate.skills));
  }

  /* allows user to embed list information into a html table within a specific set of tags */
  toTable(id) {
    let parent = document.getElementById(id),
        table =  document.createElement('table');
    table.setAttribute('class', 'candidates')

    // head of table
    let thead = document.createElement('thead');
    let trhead = document.createElement('tr');

    // create list of titles, loop through appending to table
    // need to make sure its in the same order as class though
    ['Name','Skills'].forEach(element => {
      let th = document.createElement("th");
      th.appendChild(document.createTextNode(element));
      trhead.appendChild(th);
    });
    thead.appendChild(trhead);
    table.appendChild(thead);

    // body of table
    let tbody = document.createElement('tbody');
    // loop through each candidate and append its properties to td tags
    this.finalCandidateList.forEach(element => {
      let tr = document.createElement('tr');
      for(let property in element) {
        if(element.hasOwnProperty(property)) {
          let td = document.createElement('td');
          td.appendChild(document.createTextNode(element[property]));
          tr.appendChild(td);
        }
      }
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    parent.appendChild(table);
  }

  // prints list to log (intended for test purposes before the table implementation)
  toLog() {
    this.finalCandidateList.forEach(candidate => console.log(candidate.name + "|" + candidate.skills));
  }
}
