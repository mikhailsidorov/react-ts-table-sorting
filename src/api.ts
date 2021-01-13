import {report} from "process";
import { ILibraryResponse, ILibrary } from 'models';

const api = async <T>(url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data:T = await response.json();
  return data;

}
export const getData = async () => {
  const rawData = await api<ILibraryResponse[]>('opendata/7705851331-stat_library/data-2016-11-10T00-00-00-structure-2016-09-12T00-00-00.json');
  const data:ILibrary[] = rawData.map(rawLib => {
    const lib: ILibrary = {
      order: rawLib.order,
      fullname: rawLib.fullname,
      kopuk: rawLib.kopuk,
      territory: rawLib.territory,
      address: rawLib.address,
      formName: rawLib.formname,
      period: rawLib.period,
      libraries: rawLib.libraries,
      buildingsRepair: rawLib.buildings_repair,
      buildingsDisrepair: rawLib.buildings_disrepair,
      buildingsManagement: rawLib.buildings_management,
      librariesComputers: rawLib.libraries_computers,
      internet: rawLib.internet,
      site: rawLib.site,
      numberOfPersonalComputersInLibrariesUnits: rawLib.number_of_personal_computers_in_libraries_units,
      computers: rawLib.computers,
      digitalCatalogs: rawLib.digital_catalogs,
      internetCatalogs: rawLib.internet_catalogs,
      electronicCatalogueVolume: rawLib.electronic_catalogue_volume,
      internetCatalogueVolume: rawLib.internet_catalogue_volume,
      users: rawLib.users,
      usersChildren: rawLib.users_children,
      visits: rawLib.visits,
      receivedCopies: rawLib.received_copies,
      receivedWlectronic: rawLib.received_electronic,
      outOfInstances: rawLib.out_of_instances,
      droppedCopies: rawLib.dropped_copies,
      copies: rawLib.copies,
      copiesElectronic: rawLib.copies_electronic,
      copiesIssued: rawLib.copies_issued,
      issuedElectronic: rawLib.issued_electronic,
      copiesIssuedChildren: rawLib.copies_issued_children,
      subscribers: rawLib.subscribers,
      individualSubscribersInformationServicesUnits: rawLib.individual_subscribers_information_services_units,
      visitsSites: rawLib.visits_sites,
      employees: rawLib.employees,
      employeesStaff: rawLib.employees_staff,
      staffHigheeducated: rawLib.staff_higheeducated,
      staffVocationalPeople: rawLib.staff_vocational_people,
      funds: rawLib.funds,
      fundsBudget: rawLib.funds_budget,
      fundsEntrepreneurial: rawLib.funds_entrepreneurial,
      fundsMainActivityThousandRubles: rawLib.funds_main_activity_thousand_rubles,
      fundsUsed: rawLib.funds_used,
      fundsStaffThousandRubles: rawLib.funds_staff_thousand_rubles,
      fundsAcquisition: rawLib.funds_acquisition,
    }
    return lib;
  })
  return data;
}
