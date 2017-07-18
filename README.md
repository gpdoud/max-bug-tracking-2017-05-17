# Bug Tracking Project

## Overview
The Bug Tracking Project is an exercise to allow students to experience working as a team on a single project. There will be a single repository (the instructor will own this) and the length of time will be no more than one week.

There is no expectation that the entire project will be completed within the one week time horizon. The goal is to get a working version of the software regardless of the number of features that are or are not included.

## Requirements

  * The system shall record bugs/enhancements discovered by users including
    * Description (text)
    * Date entered (date)
    * Date resolved (date)
    * Steps to recreate (text)
    * Status:
      * New - when initially entered
      * Open - when a person begins working on it
      * Resolved - when resolution has been found and bug updated
      * Closed - when not resolved but not longer an issue
    * User entering the bug/enh (defaults to logged in user)
    * User resolving the bug/enh
  * The system shall allow searching of description to find bugs matching a string
  * The system shall required users to login and be validated
  * The system shall produce a report of count of bugs/enh in each status and total bugs/enh