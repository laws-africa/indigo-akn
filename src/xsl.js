export const HTML_TO_AKN_XSL = `
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
  xmlns:html="http://www.w3.org/1999/xhtml"
  xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0"
  exclude-result-prefixes="html">

  <xsl:output method="xml" />

  <!-- ignore these elements -->
  <xsl:template match="html:head | html:style | html:script | html:link" />

  <!-- tables -->

  <xsl:template match="html:table">
    <table>
      <xsl:apply-templates select="@data-eid | @class | .//html:tr[generate-id(ancestor::html:table[1]) = generate-id(current())]" />
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

      <xsl:choose>
        <!-- Keep paragraph boundaries and classes when the editor receives
             structured paragraphs. Bare inline cell content remains one p. -->
        <xsl:when test="html:p or html:span[contains(concat(' ', normalize-space(@class), ' '), ' akn-p ')] or html:table">
          <xsl:for-each select="node()">
            <xsl:choose>
              <xsl:when test="self::html:p or self::html:span[contains(concat(' ', normalize-space(@class), ' '), ' akn-p ')]">
                <p><xsl:apply-templates select="@class | @data-eid | node()"/></p>
              </xsl:when>
              <xsl:when test="self::html:table"><xsl:apply-templates select="."/></xsl:when>
              <xsl:when test="(self::* or normalize-space(.)) and not(preceding-sibling::node()[self::* or normalize-space(.)][1][not(self::html:p or self::html:span[contains(concat(' ', normalize-space(@class), ' '), ' akn-p ')] or self::html:table)])">
                <xsl:variable name="previous-block" select="generate-id(preceding-sibling::*[self::html:p or self::html:span[contains(concat(' ', normalize-space(@class), ' '), ' akn-p ')] or self::html:table][1])"/>
                <p><xsl:apply-templates select=". | following-sibling::node()[not(self::html:p or self::html:span[contains(concat(' ', normalize-space(@class), ' '), ' akn-p ')] or self::html:table)][generate-id(preceding-sibling::*[self::html:p or self::html:span[contains(concat(' ', normalize-space(@class), ' '), ' akn-p ')] or self::html:table][1]) = $previous-block]"/></p>
              </xsl:when>
            </xsl:choose>
          </xsl:for-each>
        </xsl:when>
        <xsl:otherwise><p>
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
      </p></xsl:otherwise>
      </xsl:choose>

    </xsl:element>
  </xsl:template>

  <!-- elements -->
  
  <xsl:template match="html:div">
    <p>
      <xsl:apply-templates />
    </p>
  </xsl:template>

  <xsl:template match="html:p">
    <p>
      <xsl:apply-templates select="@class | @data-eid"/>
      <xsl:apply-templates />
    </p>
  </xsl:template>

  <xsl:template match="html:b | html:br | html:i | html:sup | html:sub | html:u | html:ul | html:li">
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

  <xsl:template match="@class">
    <xsl:variable name="classes"><xsl:call-template name="authored-classes"><xsl:with-param name="classes" select="normalize-space(.)"/></xsl:call-template></xsl:variable>
    <xsl:if test="normalize-space($classes) != ''"><xsl:attribute name="class"><xsl:value-of select="normalize-space($classes)"/></xsl:attribute></xsl:if>
  </xsl:template>

  <!-- Structural akn-* classes come from rendering, not source markup. -->
  <xsl:template name="authored-classes">
    <xsl:param name="classes"/>
    <xsl:variable name="first" select="substring-before(concat($classes, ' '), ' ')"/>
    <xsl:if test="$first != '' and (not(starts-with($first, 'akn-')) or starts-with($first, 'akn--')) and not(starts-with($first, 'cke_'))"><xsl:value-of select="$first"/><xsl:text> </xsl:text></xsl:if>
    <xsl:if test="contains($classes, ' ')"><xsl:call-template name="authored-classes"><xsl:with-param name="classes" select="substring-after($classes, ' ')"/></xsl:call-template></xsl:if>
  </xsl:template>

  <xsl:template match="@colspan | @rowspan | @style">
    <xsl:if test="normalize-space(.) != ''">
      <xsl:attribute name="{name(.)}"><xsl:value-of select="." /></xsl:attribute>
    </xsl:if>
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
