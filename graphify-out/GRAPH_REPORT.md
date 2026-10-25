# Graph Report - karka-academy  (2026-10-26)

## Corpus Check
- 6 files · ~563,271 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 73 nodes · 78 edges · 8 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ab3ccb8a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]

## God Nodes (most connected - your core abstractions)
1. `openModal()` - 4 edges
2. `goToStep()` - 4 edges
3. `processAiQuery()` - 3 edges
4. `closeModal()` - 3 edges
5. `scripts` - 3 edges
6. `askAiQuestion()` - 2 edges
7. `submitPapApplication()` - 2 edges
8. `openSyllabus()` - 2 edges
9. `closeSyllabusModal()` - 2 edges
10. `openInfiniModal()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (8 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (3): aiKnowledgeBase, storiesData, syllabusData

### Community 1 - "Community 1"
Cohesion: 0.67
Nodes (3): askAiQuestion(), openSpikeDemo(), processAiQuery()

### Community 2 - "Community 2"
Cohesion: 0.33
Nodes (6): goToStep(), initPillarStepper(), openInfiniModal(), openModal(), openSyllabus(), submitPapApplication()

### Community 4 - "Community 4"
Cohesion: 0.67
Nodes (3): closeInfiniModal(), closeModal(), closeSyllabusModal()

### Community 7 - "Community 7"
Cohesion: 0.17
Nodes (11): author, description, keywords, license, main, name, scripts, start (+3 more)

### Community 8 - "Community 8"
Cohesion: 0.33
Nodes (6): dependencies, cors, dotenv, express, mongoose, nodemailer

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (11): app, ContactLead, cors, dns, EnrollmentLead, express, mongoose, ContactLeadSchema (+3 more)

## Knowledge Gaps
- **29 isolated node(s):** `aiKnowledgeBase`, `storiesData`, `syllabusData`, `mongoose`, `ContactLeadSchema` (+24 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 8` to `Community 7`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `openModal()` connect `Community 2` to `Community 0`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **What connects `aiKnowledgeBase`, `storiesData`, `syllabusData` to the rest of the system?**
  _29 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Community 9` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._