# API Testing tool

- __Status__: Accepted
- __Author__: knakto
- __Date__: 15/11/26

## Context

I start to create RestFul API enpoint, and find tool to test and troubleshoot.

### Option 1: Pure Curl

__Pros__:
- Can use shell command to automate test case.

__Cons__:
- Hard to use and virtialize output.

### Option 2: Swagger

__Pros__:
- Map every enpoint to web swagger, easy to try and test.

__Cons__:
- Can not automate test.
- Have to learn how to write swagger.json to map all endpoint my self.

## Decision

Accept both __Option 1: Purl Curl__ and __Option 2: Swagger__, Use Swagger for test and show on eval,
Use Pure Curl to API Stress Testing and CI test in feature.

---

