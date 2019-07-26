import Profile from './Profile'
import Layout from './Layout'
import Organizatio from './Organizatio'
import Role from './Role'
import Resources from './Resources'
import Jurisdiction from './Jurisdiction'
import User from './User'
import Device from './Device'
import DeviceType from './DeviceType'
import Seal from './Seal'

export default {
	profileStore: new Profile(),
	layoutStore: new Layout(),
	organizatioStore: new Organizatio(),
	roleStore: new Role(),
	resourcesStore: new Resources(),
	jurisdictionStore: new Jurisdiction(),
	userStore: new User(),
	deviceStore: new Device(),
	deviceTypeStore: new DeviceType(),
	sealStore: new Seal()
}