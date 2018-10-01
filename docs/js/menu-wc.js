'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">ngx-api-orm documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                            <a href="license.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>LICENSE
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
              ${ isNormalMode ? 'data-target="#additional-pages"' : 'data-target="#xs-additional-pages"'}>
                <span class="icon ion-ios-book"></span>
                <span>Usage guides</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                    <li class="link ">
                        <a href="additional-documentation/model-usage.html" data-type="entity-link" data-context-id="additional">Model usage</a>
                    </li>
                    <li class="link ">
                        <a href="additional-documentation/extendability.html" data-type="entity-link" data-context-id="additional">Extendability</a>
                    </li>
                    <li class="link ">
                        <a href="additional-documentation/default-api-format-examples.html" data-type="entity-link" data-context-id="additional">Default API format examples</a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/ResourceModule.html" data-type="entity-link">ResourceModule</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/BaseBuilder.html" data-type="entity-link">BaseBuilder</a>
                    </li>
                    <li class="link">
                        <a href="classes/HeadersInterceptor.html" data-type="entity-link">HeadersInterceptor</a>
                    </li>
                    <li class="link">
                        <a href="classes/RawInstance.html" data-type="entity-link">RawInstance</a>
                    </li>
                    <li class="link">
                        <a href="classes/Resource.html" data-type="entity-link">Resource</a>
                    </li>
                    <li class="link">
                        <a href="classes/ResourceModuleConfigurationWithProviders.html" data-type="entity-link">ResourceModuleConfigurationWithProviders</a>
                    </li>
                    <li class="link">
                        <a href="classes/SimpleAdapter.html" data-type="entity-link">SimpleAdapter</a>
                    </li>
                    <li class="link">
                        <a href="classes/SimpleBuilder.html" data-type="entity-link">SimpleBuilder</a>
                    </li>
                    <li class="link">
                        <a href="classes/ToManyAdapter.html" data-type="entity-link">ToManyAdapter</a>
                    </li>
                    <li class="link">
                        <a href="classes/ToManyBuilder.html" data-type="entity-link">ToManyBuilder</a>
                    </li>
                    <li class="link">
                        <a href="classes/ToManyRelation.html" data-type="entity-link">ToManyRelation</a>
                    </li>
                    <li class="link">
                        <a href="classes/ToOneAdapter.html" data-type="entity-link">ToOneAdapter</a>
                    </li>
                    <li class="link">
                        <a href="classes/ToOneBuilder.html" data-type="entity-link">ToOneBuilder</a>
                    </li>
                    <li class="link">
                        <a href="classes/ToOneRelation.html" data-type="entity-link">ToOneRelation</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/HttpClientOptions.html" data-type="entity-link">HttpClientOptions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Instantiable.html" data-type="entity-link">Instantiable</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/JsonApiAttributes.html" data-type="entity-link">JsonApiAttributes</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/JsonApiBaseResponse.html" data-type="entity-link">JsonApiBaseResponse</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/JsonApiError.html" data-type="entity-link">JsonApiError</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/JsonApiLink.html" data-type="entity-link">JsonApiLink</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/JsonApiRelationship.html" data-type="entity-link">JsonApiRelationship</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/JsonApiResource.html" data-type="entity-link">JsonApiResource</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/JsonApiResourceIdentifier.html" data-type="entity-link">JsonApiResourceIdentifier</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/JsonApiResponse.html" data-type="entity-link">JsonApiResponse</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ModelOptions.html" data-type="entity-link">ModelOptions</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ResourceType.html" data-type="entity-link">ResourceType</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
