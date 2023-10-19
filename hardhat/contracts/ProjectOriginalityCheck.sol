// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ProjectOriginalityCheck is ERC721Holder {
  uint public projectCount = 0;
  Project[] public projects;

  struct Project{
    uint id;
    string cid;
    address from;
  }

  uint256 public tableId;
  string private constant _TABLE_PREFIX = "my_hardhat_table";
  uint256 public dataCount = 1;

  constructor() {
    tableId = TablelandDeployments.get().create(
      address(this),
      SQLHelpers.toCreateFromSchema(
        "id integer primary key," // Notice the trailing comma
        "val text",
        _TABLE_PREFIX
      )
    );

    TablelandDeployments.get().mutate(
      address(this),
      tableId,
      SQLHelpers.toInsert(
        _TABLE_PREFIX,
        tableId,
        "id,val",
        string.concat(
          Strings.toString(dataCount), // Convert to a string
          ",",
          SQLHelpers.quote("Test Tables") // Wrap strings in single quotes with the `quote` method
        )
      )
    );

    dataCount++;
  }

  function insertProject(string memory val) public payable {
    TablelandDeployments.get().mutate(
      address(this),
      tableId,
      SQLHelpers.toInsert(
      _TABLE_PREFIX,
      tableId,
      "id,val",
      string.concat(
          Strings.toString(dataCount), // Convert to a string
          ",",
          SQLHelpers.quote(val) // Wrap strings in single quotes
        )
      )
    );

    dataCount++;
  }

  function addProject(string memory cid) external {
    projects.push(Project(projectCount, cid, msg.sender));
    projectCount++;
  }

  function getPosts() external view returns (Project[] memory) {
    return projects;
  }
}