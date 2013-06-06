package com.ensighten.tests;

import java.net.MalformedURLException;
import java.net.URL;
import org.junit.AfterClass;
import org.openqa.selenium.*;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.*;

public class GridTests {

	String DellUrl = "http://www.dell.se/?gateway=privacy";
	String NorUrl = "http://store.norgren.com/uk";
	WebDriver driver = null;
	
	@Parameters({"browser"})
	@BeforeClass
	public void setup (String browser) throws MalformedURLException {
		DesiredCapabilities capability=null;
		
		if(browser.equalsIgnoreCase("firefox")){
			System.out.println("firefox");
			capability= DesiredCapabilities.firefox();
			capability.setBrowserName("firefox");
			capability.setVersion("8");
			//capability.setPlatform(org.openqa.selenium.Platform.WINDOWS);						
		}
		
		if(browser.equalsIgnoreCase("chrome")){
			System.out.println("chrome");
			capability= DesiredCapabilities.chrome();
			capability.setBrowserName("chrome");
			capability.setVersion("21");
			//capability.setPlatform(org.openqa.selenium.Platform.WINDOWS);
		}
		
		if(browser.equalsIgnoreCase("iexplore")){
			System.out.println("iexplore");
			capability= DesiredCapabilities.internetExplorer();
			capability.setBrowserName("internet explorer");
			capability.setVersion("8");
			//capability.setPlatform(org.openqa.selenium.Platform.WINDOWS);
		}		
		driver = new RemoteWebDriver(new URL("http://se.ensighten.com:4444/wd/hub"), capability);
	}		 
	
	// Running 2 js commands
	// Enable Privacy is True, expected returns true
	// Gateway loads in the DOM, expected Gateway is defined
	@Test
	public void BootStrapperTest() throws Exception {
		driver.get(DellUrl);
		JavascriptExecutor js = (JavascriptExecutor) driver;
		Object Value = js.executeScript ("return Bootstrapper.enablePrivacy"); //Enable Privacy is True, expected returns true		
		System.out.println(Value);	
		js.executeScript ("Bootstrapper.gateway"); //Gateway loads in the DOM, expected Gateway is defined	
	}

	// Running 1 js command to check if Overlay rule was delivered
	// Javascript object to see if the Privacy Dialog has been sent over to the client-side
	// Bootstrapper.privacyDialog
	@Test
	public void OverlayRuleTest() throws Exception {
		driver.get(NorUrl);
		JavascriptExecutor js = (JavascriptExecutor) driver;
		js.executeScript ("Bootstrapper.privacyDialog"); // Dialog is defined 					
	}
	
	@AfterClass
	  public void quitDriver() {
	    driver.quit();
	}	
}	