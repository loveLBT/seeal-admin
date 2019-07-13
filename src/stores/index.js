import Profile from './Profile'
import Layout from './Layout'
import Organizatio from './Organizatio'
import Role from './Role'

export default {
	profileStore: new Profile(),
	layoutStore: new Layout(),
	organizatioStore: new Organizatio(),
	roleStore: new Role() 
}