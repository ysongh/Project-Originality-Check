// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract ProjectOriginalityCheck {
  uint public projectCount = 0;
  Project[] public projects;

  struct Project{
    uint id;
    string cid;
    address from;
  }

  constructor() {}

  function addProject(string memory cid) external {
    projects.push(Project(projectCount, cid, msg.sender));
    projectCount++;
  }

  function getPosts() external view returns (Project[] memory) {
    return projects;
  }
}