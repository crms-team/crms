# CRMS


<br/>


CRMS is a tool for management cloud resource as a user interface. CRMS can confirm information of cloud resource and manage cloud resource.


We concentrated at five feature when we develop our system. 
Five feature of our system is that:
<br/>

- **CRUD Resource** : Our system provide Crud that Create, Read ,Update, Delete of cloud resource. you can manage cloud resource more easier and comfortable.


![화면-기록-2020-10-26-오후-4 31 38-_online-video-cutter com_](https://user-images.githubusercontent.com/37172677/97383265-91ba2a00-1910-11eb-86b6-030f2b42ea64.gif)

- **Visualization** : Our system provide cloud architecture visualization. In our system, you can see information about your current cloud architecture and resources.

![KakaoTalk_20201028_111900696-_online-video-cutter com_](https://user-images.githubusercontent.com/37172677/97383290-9b439200-1910-11eb-9329-684abfbf11ff.gif)

- **History** : CRMS makes it easy to check the change of resource information according to modification to multi-cloud resources. You can see which cloud resources have changed and how.

![image](https://user-images.githubusercontent.com/37172677/97113104-8063f880-172b-11eb-8042-45e0744c569e.png)

- **Integration API** : Currently, CRMS only supports aws, but in the future, it will be an integrated API that supports multi-vendor. To this end, the program has been implemented so that there will be no significant changes even if vendors are added later.

![image](https://user-images.githubusercontent.com/37172677/92099538-97662880-ee15-11ea-95b8-7fc3fbfe3960.png)

- **Scheduler** : With the cloud, you can lose money on running your resources all the time. To reduce the inconvenience to these users, we have developed a Scheduler that can automatically turn on and off resources at a time set by the customer.

![image](https://user-images.githubusercontent.com/37172677/97113123-9c679a00-172b-11eb-8e52-22dc81c86d4f.png)

For more information on our systems, please visit our website.

<br/>

## Built With
---
We Programing based on:
<br/>

* node 12.18.2
* react 16.13.1
* d3  4.0.0-alpha
* aws-sdk 2.738.0
* express 4.1.4
* swagger 4.0.0

<br>

## How to Start & Documentation

---
Documentation is on our website.

<br/>

- File Structure

The file structure of our system consists of three things that Back-end on server folder, Server on crms folder, Front-end on src folder. So if you want modify our system check this part and go to that folder. and read the README in that folder.

<br/>

- How to start


> 1. Install all of our npm module on terminal ( npm i )
> 2. Create .env file 
> 3. Enter  ``` REACT_APP_SERVER_URL=http://{your ip or localhost}:4000  ``` in the env file
> 4. Enter ```npm run-script build ``` on terminal
> 5. Enter ```node server ``` on terminal
> 6. Check password on crms.config in the Data folder
> 7. Enter the url on web browser and login
> 8. click setting and regist your Cloud access key and secret key and region
> 9. it's worked!

If you have a problem in start, please visit our website and check guide!

<br/>

## How to Contribute CRMS
---
If you want contribute CRMS, Clink the Link!

[Contribute](https://github.com/crms-team/crms/blob/master/CONTRIBUTING.md)

## License
---
[License](https://github.com/crms-team/crms/blob/master/LICENSE)

<br/>

## Contact
---
[Nevation](https://github.com/Nevation)

[ReturnReason](https://github.com/ReturnReason)

[backtion](https://github.com/backtion)
