export const HTML_TO_AKN_XSL = `
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
  xmlns:html="http://www.w3.org/1999/xhtml"
  xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0"
  exclude-result-prefixes="html">

  <xsl:output method="xml" />

  <!-- tables -->

  <xsl:template match="html:table">
    <table>
      <xsl:apply-templates select="@data-eid | //html:tr" />
    </table>
  </xsl:template>

  <xsl:template match="html:tr">
    <tr>
      <xsl:apply-templates select="node()" />
    </tr>
  </xsl:template>

  <xsl:template match="html:td | html:th">
		<xsl:element name="{name(.)}">
      <xsl:apply-templates select="@colspan | @rowspan | @style | @class" />

      <p>
        <xsl:for-each select="node()">
          <xsl:choose>
            <xsl:when test="name(.) = 'p'">
              <!-- ignore p (we already have one) and do children -->
              <xsl:apply-templates select="node()"/>
            </xsl:when>

            <xsl:otherwise>
              <xsl:apply-templates select="."/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:for-each>
      </p>

    </xsl:element>
  </xsl:template>

  <!-- elements -->

  <xsl:template match="html:p">
    <p>
      <xsl:apply-templates />
    </p>
  </xsl:template>

  <xsl:template match="html:br">
    <eol/>
  </xsl:template>

  <xsl:template match="html:b | html:i | html:sup | html:sub">
    <xsl:element name="{name(.)}">
      <xsl:apply-templates />
    </xsl:element>
  </xsl:template>

  <xsl:template match="html:a">
    <ref>
      <xsl:attribute name="href"><xsl:value-of select="@data-href" /></xsl:attribute>
      <xsl:apply-templates />
    </ref>
  </xsl:template>

  <xsl:template match="html:img">
    <img>
      <xsl:attribute name="src"><xsl:value-of select="@data-src" /></xsl:attribute>
    </img>
  </xsl:template>

  <xsl:template match="html:span[@class='akn-remark']">
    <remark status="editorial">
      <xsl:apply-templates />
    </remark>
  </xsl:template>

  <!-- attributes -->

  <xsl:template match="@colspan | @rowspan | @style | @class">
    <xsl:attribute name="{name(.)}"><xsl:value-of select="." /></xsl:attribute>
  </xsl:template>

  <!-- map data-id to id -->
  <xsl:template match="@data-eid">
    <xsl:attribute name="eId"><xsl:value-of select="." /></xsl:attribute>
  </xsl:template>

  <!-- text -->

  <xsl:template match="text()">
    <xsl:value-of select="."/>
  </xsl:template>

</xsl:stylesheet>`;
