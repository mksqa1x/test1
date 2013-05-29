Privacy-QA
==========
WebDriverPrivacyTests "Windows" Setup:

Install Java: i.e. “Java SE Development Kit 7u21 x64”
* http://www.oracle.com/technetwork/java/javase/downloads/index.htm
* Install to default location e.g. C:\Program Files\Java
* Check on the command line: java –version

Setup the Chrome Driver:
*Downlaod the chorme server: chromedriver2_win32_0.8.zip 
*Located at: http://code.google.com/p/chromedriver/downloads/list  
*Unpack the chromedriver.exe into: C:\chromedriver
*Make sure the chrome browser is installed at: C:\Program Files (x86)\Google\Chrome\Application

Install Eclipse: i.e. “Eclipse IDE for Java Developers x64”
* http://www.eclipse.org/downloads/ 
*	Download and unpack the eclipse folder: e.g. To your desktop.
*	Launch Eclipse.
*	Set the workspace, e.g. C:\Users\Mark\workspace
*	Click on the “Workbench” icon inside Eclipse.   

Install the “TestNG” Plugin for Eclipse:
*	Eclipse>Help>Install New Software...
*	In the field: “Work with” enter: http://beust.com/eclipse
*	Click Add
*	Name: TestNG
*	Location, should be filled in with: http://beust.com/eclipse
*	Ok/Next
*	Check all boxes for TestNG.
*	Follow the Eclipse prompts and Restart Eclipse. 

Import Github Project into Eclipse:
* File>Import>Git>Projects from Git>Next
*	Select URI > Next
*	In the URI field: Copy/Paste the HTTPS URL from Github: 
*	e.g. https://github.com/Ensighten/Privacy-QA.git
*	Protocol: https
*	Enter your Github: user and pass
*	Check the “master”>Next
*	Directory: e.g. C:\Users\Mark\git\Privacy-QA
*	Initial branch: master
*	Remote name: origin>Next
*	Check: Import existing projects>Next
*	Import Projects: no changes, keep defaults>Finish

Run the current test:
*	The Project Dependencies should automatically setup. 
*	The current tests can be ran in:
*	/src/test/java/com/ensighten/tests
*	Click on: MRTests.java and then Click the Green/White Arrow “RUN” in the topbar


