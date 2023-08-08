Lets assume that the language is Java. Linting could be done with checkstyle. Jenkins test harness with Java seems to include JUnit, and Maven for building and I assume Gradle is doable as well.

Travis CI and Drone apparently are options besides Jenkins & Github Actions. Java seems to have its own CI system Semaphore which uses Spring Boot, Maven, JUnit and Jmeter.

Travis is a hosted system as is Drone. Self hosting allows for greater control over the environment and the process but requires more work to setup, maintain and change. Having a 100% uptime system is probably easier with a cloud system so if that is a requirement for the project, self-hosting might be harder than necessary.

Cloud options should be easy to setup and use as far as I know. There might be special cases where Cloud is not a viable option vis-a-vis specific laws or if there's something special that needs to be setup in the environment that is not allowed in the out of the box Cloud options. Cloud systems also might have some limitations on resources.

The choice would be easier to make with the demands of the project. For example if we notice that the pipeline takes too long and there's no possibility to scale the resources, one might want to change to a hosted solution.
