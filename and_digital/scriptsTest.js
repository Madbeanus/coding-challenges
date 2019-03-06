// here will be the specification for the unit tests using Jasmine

// things it will test:
//  - properly initialising list
//  - properly filtering list
//  - any other new features

const newCandidates = [
  { name: "Kerrie", skills: ["JavaScript", "Docker", "Ruby"] },
  { name: "Mario", skills: ["Python", "AWS"] },
  { name: "Jacquline", skills: ["JavaScript", "Azure"] },
  { name: "Kathy", skills: ["JavaScript", "Java"] },
  { name: "Anna", skills: ["JavaScript", "AWS"] },
  { name: "Matt", skills: ["PHP", "AWS"] },
  { name: "Matt", skills: ["PHP", ".Net", "Docker"] },
];

describe('Testing Initalisation of candidate list given an input.', ()=> {

  it('Check first element is same.', ()=> {
    let firstCandidate = new Candidate(newCandidates[0].name,newCandidates[0].skills);
    let candidates = new Candidates(newCandidates);
    expect((candidates.originalCandidateList[0].name == firstCandidate.name) &&
           (candidates.originalCandidateList[0].skills == firstCandidate.skills)).toBe(true);
  })

  it('Check last element is same.', ()=> {
    let lastCandidate = new Candidate(newCandidates[newCandidates.length-1].name,newCandidates[newCandidates.length-1].skills);
    let candidates = new Candidates(newCandidates);
    expect((candidates.originalCandidateList[candidates.originalCandidateList.length-1].name == lastCandidate.name) &&
           (candidates.originalCandidateList[candidates.originalCandidateList.length-1].skills == lastCandidate.skills)).toBe(true);
  })
})

describe('Testing filtering of the list.', ()=> {

  // in retrospect a better way to test this would be to test the actual skills array
  // because if, say, three candidates knew both JavaScript and AWS the test
  // for JavaScript filtering would still come back true.
  it('List should only contain JavaScript skills.', ()=> {
    let candidates = new Candidates(newCandidates);
    candidates.filterCandidatesBySkill('JavaScript');
    // all those who know JavaScript
    let correctNameList = ["Kerrie","Jacquline","Kathy","Anna"];
    let testBool = false;
    candidates.finalCandidateList.forEach(candidate => {
      if(correctNameList.includes(candidate.name)) {
        testBool = true;
      } else {
        testBool = false;
      }
      console.log(testBool);
    })
    expect(testBool).toBe(true);
  })
})
