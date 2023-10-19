// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ProjectNFT is ERC721URIStorage {
  uint public projectCount = 0;
  Project[] public projects;

  struct Project{
    uint id;
    string cid;
    address from;
  }

  constructor() ERC721("Your Projec", "YP") {}

  function mintProject(string memory cid) external {
    _mint(msg.sender, projectCount);
    _setTokenURI(projectCount, cid);

    projectCount++;
  }
}