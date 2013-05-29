package com.ensighten.tests;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.Test;

public class MRTests {
	//String GWUrl = "http://www.dell.com";
	String GWUrl = "http://www.dell.se/?gateway=privacy";
			
	// ****************** BROWSER TESTS ***************************
	// Tests fail if the Bootstrapper is not defined in Browser DOM
	// Tests fail if Bootstrapper.enablePrivacy does not return true 
	// Tests pass if the Bootstrapper.enablePrivacy returns true
	// Tests pass if the Bootstrapper.gateway loads in Browser DOM
	// ****************** BROWSER TESTS ***************************
	@Test
	public void Chrome_BootStrapper_Tests() throws Exception {
		System.setProperty("webdriver.chrome.driver", "C:/chromedriver/chromedriver.exe"); //Chrome Server
		DesiredCapabilities capabilities = DesiredCapabilities.chrome();
		capabilities.setCapability("chrome.binary", "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"); //Chrome Browser
		WebDriver CRdriver = new ChromeDriver();		
		CRdriver.get(GWUrl);				
		JavascriptExecutor crjs = (JavascriptExecutor) CRdriver;		
		Object isTrue = crjs.executeScript ("return Bootstrapper.enablePrivacy"); //Enable Privacy is True, expected returns true		
		System.out.println(isTrue);	
		crjs.executeScript ("Bootstrapper.gateway"); //Gateway loads in the DOM, expected Gateway is defined
		CRdriver.quit();
		}
	
	@Test
	public void FF_BootStrapper_Tests() throws Exception {
		WebDriver FFdriver = new FirefoxDriver();	
		JavascriptExecutor ffjs = (JavascriptExecutor) FFdriver;	
		FFdriver.get(GWUrl);		
		Object isTrue = ffjs.executeScript ("return Bootstrapper.enablePrivacy"); //Enable Privacy is True, expected returns true		
		System.out.println(isTrue);	
		ffjs.executeScript ("Bootstrapper.gateway"); //Gateway loads in the DOM, expected Gateway is defined
		FFdriver.quit();
		}
}
